import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { images } from '../../constants'
import SearchInput from '../../components/Searchinput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts, getUserPosts, searchPosts } from '../../lib/appwrite'
import userAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { Query } from 'react-native-appwrite'
import { useLocalSearchParams } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'

const Profile = () => {

 
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  // const { data: posts, refetch } = userAppwrite(() => searchPosts(Query));
  const { data: posts } = userAppwrite(() => getUserPosts(user.$id));

  // console.log(query, posts)

  
  
    
  
  
  

  console.log(posts)


  return (
   <SafeAreaView className="bg-primary h-full">
    <FlatList
      data={posts}
      // data={[]}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <VideoCard video={item}/>
      )}
      ListHeaderComponent={() =>(
        <View className="my-6 px-4">
              <Text className="font-pmedium text-sm text-gray-100">
                Search Results
              </Text>

              <Text className="text-2xl font-psemibold text-white">
                {/* {query} */}
              </Text>

              <View className="mt-6 mb-8"> 

                {/* <SearchInput initialQuery={query}/> */}

              </View>
             
        </View>
      )}
      ListEmptyComponent={() => (
        <EmptyState 
         title="No Videos Found"
         subtitle="No Videos Found for this search query"
        />
      )}
     
    />
   </SafeAreaView>
  )
}

export default Profile