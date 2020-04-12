package household

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Consumption in mongodb
type Consumption struct {
	Model string  `bson:"model,omitempty" json:"model,omitempty"`
	Slope float64 `bson:"slope,omitempty" json:"slope,omitempty"`
}

// Production in mongodb
type Production struct {
	Battery float64 `bson:"battery,omitempty" json:"battery"`
	Model   string  `bson:"model,omitempty" json:"model,omitempty"`
	Slope   float64 `bson:"slope,omitempty" json:"slope,omitempty"`
}

// User in mongodb
type User struct {
	ID            primitive.ObjectID `bson:"_id,omitempty" json:"_id,omitempty"`
	FakeID        int32              `bson:"id,omitempty" json:"id,omitempty"`
	Nonce         int32              `bson:"nonce,omitempty" json:"nonce,omitempty"`
	PublicAddress string             `bson:"publicAddress,omitempty" json:"publicAddress,omitempty"`
	Username      string             `bson:"username,omitempty" json:"username,omitempty"`
	Consumption   Consumption        `bson:"consumption,omitempty" json:"consumption,omitempty"`
	Production    Production         `bson:"production,omitempty" json:"production,omitempty"`
	Producer      bool               `bson:"producer,omitempty" json:"producer,omitempty"`
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
func Update() []UpdateInfo {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(
		"mongodb+srv://omkar:aBFI7WWIXXuwD3Bt@cluster0-iasb3.mongodb.net/test?retryWrites=true&w=majority",
	))
	if err != nil {
		log.Fatal(err)
	}

	usersCollection := client.Database("Users").Collection("Login/Password")
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
		if user.Username == "ratan" {
			continue
		}

		currUpdateInfo := UpdateInfo{UserID: user.ID, PublicAddress: user.PublicAddress}

		if user.Consumption.Model == "linear" {
			currUpdateInfo.EnergyConsumed = user.Consumption.Slope
		}

		if user.Producer {
			if user.Production.Model == "linear" {
				currUpdateInfo.EnergyProduced = user.Production.Slope
				currUpdateInfo.Producer = true
				currUpdateInfo.Battery = user.Production.Battery + user.Production.Slope
			}
		}

		updates = append(updates, currUpdateInfo)
	}

	return updates
}
