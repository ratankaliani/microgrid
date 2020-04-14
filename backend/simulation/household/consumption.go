package household

import (
	"context"
	"log"
	"math"
	"math/rand"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// Consumption in mongodb
type Consumption struct {
	Model      string  `bson:"model,omitempty" json:"model,omitempty"`
	Slope      float64 `bson:"slope,omitempty" json:"slope,omitempty"`
	UpperBound float64 `bson:"upperBound,omitempty" json:"upperBound,omitempty"`
	LowerBound float64 `bson:"lowerBound,omitempty" json:"lowerBound,omitempty"`
	Period     float64 `bson:"period,omitempty" json:"period,omitempty"`
	Step       float64 `bson:"step,omitempty" json:"step,omitempty"`
	Amplitude  float64 `bson:"amplitude,omitempty" json:"amplitude,omitempty"`
}

// Production in mongodb
type Production struct {
	Battery   float64 `bson:"battery,omitempty" json:"battery"`
	Model     string  `bson:"model,omitempty" json:"model,omitempty"`
	Slope     float64 `bson:"slope,omitempty" json:"slope,omitempty"`
	Period    float64 `bson:"period,omitempty" json:"period,omitempty"`
	Step      float64 `bson:"step,omitempty" json:"step,omitempty"`
	Amplitude float64 `bson:"amplitude,omitempty" json:"amplitude,omitempty"`
}

// User in mongodb
type User struct {
	ID            primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	Nonce         int32              `bson:"nonce,omitempty" json:"nonce,omitempty"`
	PublicAddress string             `bson:"publicAddress,omitempty" json:"publicAddress,omitempty"`
	Username      string             `bson:"username,omitempty" json:"username,omitempty"`
	Consumption   Consumption        `bson:"consumption,omitempty" json:"consumption,omitempty"`
	Production    Production         `bson:"production,omitempty" json:"production,omitempty"`
	Producer      bool               `bson:"producer,omitempty" json:"producer,omitempty"`
	CreatedAt     primitive.DateTime `bson:"createdAt,omitempty" json:"createdAt,omitempty"`
}

// UpdateInfo to be broadcasted
type UpdateInfo struct {
	UserID         primitive.ObjectID
	PublicAddress  string
	EnergyConsumed float64
	Producer       bool
	EnergyProduced float64
	Battery        float64
}

// Update used by cron job
func Update(ctx context.Context, client *mongo.Client) []UpdateInfo {
	usersCollection := client.Database("Microgrid").Collection("users")
	usersCursor, err := usersCollection.Find(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	var updates []UpdateInfo

	defer usersCursor.Close(ctx)
	for usersCursor.Next(ctx) {
		var user User
		if err = usersCursor.Decode(&user); err != nil {
			log.Fatal(err)
		}

		currUpdateInfo := UpdateInfo{UserID: user.ID, PublicAddress: user.PublicAddress}

		if user.Consumption.Model == "linear" {
			currUpdateInfo.EnergyConsumed = user.Consumption.Slope
		}

		if user.Consumption.Model == "random" {
			currUpdateInfo.EnergyConsumed = (user.Consumption.UpperBound * rand.Float64()) + user.Consumption.LowerBound
		}

		if user.Consumption.Model == "cyclic" {
			currUpdateInfo.EnergyConsumed = math.Max(0.05, user.Consumption.Amplitude*math.Sin(2*math.Pi*(1/user.Consumption.Period)*user.Consumption.Step))
			usersCollection.UpdateOne(
				ctx,
				bson.M{"_id": user.ID},
				bson.D{
					{"$inc", bson.D{{"consumption.step", 1}}},
				},
			)
		}

		if user.Producer {
			if user.Production.Model == "linear" {
				currUpdateInfo.EnergyProduced = user.Production.Slope
				currUpdateInfo.Producer = true
				currUpdateInfo.Battery = user.Production.Battery + currUpdateInfo.EnergyProduced
			}

			if user.Production.Model == "cyclic" {
				currUpdateInfo.EnergyProduced = math.Max(0.05, user.Production.Amplitude*math.Sin(2*math.Pi*(1/user.Production.Period)*user.Production.Step))
				currUpdateInfo.Producer = true
				currUpdateInfo.Battery = user.Production.Battery + currUpdateInfo.EnergyProduced
				usersCollection.UpdateOne(
					ctx,
					bson.M{"_id": user.ID},
					bson.D{
						{"$inc", bson.D{{"production.step", 1}}},
					},
				)
			}
		}

		updates = append(updates, currUpdateInfo)
	}

	return updates
}
