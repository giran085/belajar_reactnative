// import { Avatars } from 'appwrite';
import { Client, Account, ID, Databases, Query, Avatars } from 'react-native-appwrite';
import SignIn from '../app/(auth)/sign-in';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform:  "com.jsm.aora",
    projectId: "66d6cc490019c0e6c6e8",
    databaseId: "66dffa2200074c604b95",
    userCollectionId: "66dffa86000761455190",
    videoCollectionId: "66dffaec003066093f9d",
    storageId: "66f2ec2c000c8a416a2b"

}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = config;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.


const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password);

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar:avatarUrl
            }

        )

        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

};

export const signIn = async (email, password) => {
    try {
      const session = await account.createEmailPasswordSession(email, password) 
      return session; 
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId

        )
        
        return posts.documents;
    } catch (error) {
      throw new Error(error);  
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]

        )
        
        return posts.documents;
    } catch (error) {
      throw new Error(error);  
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title', query)]

        )
        
        return posts.documents;
    } catch (error) {
      throw new Error(error);  
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator', userId)]

        )
        
        return posts.documents;
    } catch (error) {
      throw new Error(error);  
    }
}



