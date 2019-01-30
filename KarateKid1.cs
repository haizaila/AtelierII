//Nick; Unity

using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using PubNubAPI;


public class KarateKid1 : MonoBehaviour
{

	///these variable are used to set up Pubnub
    public static PubNub dataServer;
    public string pubKey = "pub-c-04865ac3-c615-4d71-950a-610c7abc805a";
    public string subKey = "sub-c-35fc5cb0-1363-11e9-a898-9ef472141036";
    public string channelName = "phoneRotations";
    ////

    public double rotX;
    public double rotY;
    public double rotZ;


	void Start () 
	{

	//This section establishes the parameters for connecting to Pubnub
	PNConfiguration connectionSettings = new PNConfiguration ();
	connectionSettings.PublishKey = pubKey;
	connectionSettings.SubscribeKey = subKey;
	connectionSettings.LogVerbosity = PNLogVerbosity.BODY;
	connectionSettings.Secure = true;
	////////

	dataServer = new PubNub(connectionSettings);  //make the connection to the server

	Debug.Log("Connected to Pubnub");
	
	//Subscribe to the channel specified above 
	dataServer.Subscribe ()
      .Channels (new List<string> () { channelName } )
      .Execute();
  
    //define the function that is called when a new message arrives
    //unlike javascript it is named and defined all at once rather than linking to another function
	dataServer.SusbcribeCallback += (sender, evt) => 
	{ 
      
      SusbcribeEventEventArgs inMessage = evt as SusbcribeEventEventArgs;

      if (inMessage.MessageResult != null) 	//error check to insure the message has contents
      {
      	
      	//convert the object that holds the message contents into a Dictionary
      	Dictionary<string, object> msg = inMessage.MessageResult.Payload as Dictionary<string, object>;


        rotX = -(double)msg["rotY"]; 
        rotY = -(double)msg["rotZ"]-90 ; 
        rotZ = (double)msg["rotX"];   

        
        transform.eulerAngles = new Vector3((float)rotX,(float)rotY,(float)rotZ);
      }

    };


	}

}