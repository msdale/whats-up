# whats-up

A social interaction blog for free thinkers.

## Description

Building a node-based social interaction blog using mongoDB (noSQL) and mongoose (ODM) site.

## Table Of Contents

- [whats-up](#whats-up)
  - [Description](#description)
  - [Table Of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Questions](#questions)

## Installation

To install locally, clone this repository to your local environment.  This is a node application, so node must be installed.  mongoDB must also be installed locally.  For mongoDB documentation and installation instructions see https://docs.mongodb.com/manual/introduction/.  If you need to install node, check out this link  https://nodejs.org/en/download/.  Once mongoDB and node (and npm) are installed, attach to the repository root directory and update npm dependencies with the following command:

**npm install express mongoose**  

See demo of the installation process below...  

(github link to mp4 goes here)  


## Usage
  
To bring up the mongoDB server, from the root directory of the repository clone, in the command-line terminal type the following:  
  
**npm start**  
  
The node server will remain running in the terminal until it is terminated with a CTRL-C keystroke.  
  
See the following demo for how to start the server...  
  
(github link to mp4 goes here)  
  
There are 2 mongoose models; "User" and "Thought", defined by their corresponding schemas. There is also a schema, "Reaction" that belongs to the "Thought" schema definition, and is stored as a sub-document in the "reactions" array of the "Thought" document. Here are the summarized definitions.
1. The "User" model instantiates the "User" schema as a document collection whose documents can be (recursively) referenced in the "friends" array in the "User" document. 
2. The "Thought" model instantiates the "Thought" schema as a document collection whose documents can also be referenced in the "User" document in the array "thoughts". The "Thought" document also contains the array "reactions" which stores sub-documents defined by the "Reactions" schema. 
   
Summary of Collections Associations:  
* User (contains reference to "Thought" in "thoughts" array, and contains reference to "User" in "friends" array)  
* Thought (contains reference to "Reaction" in "reactions" array)  
  
This server uses the Express server, mongoDB and the mongoose ODM to manage and manipulate data stored in the mongoDB database instance.

See the following demo to understand the functionality available through the REST API using the HTTP GET method.
  
(github link to mp4)  
  
See the following demo to understand the functionality available through the REST API using the HTTP POST, PUT, and DELETE methods.

(github link to mp4)


## Questions

Any questions, please contact Mark Dale.

My email address is: msdaledad@gmail.com
My github profile is https://github.com/msdale