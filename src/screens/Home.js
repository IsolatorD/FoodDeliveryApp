import React, { useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native'

import { COLORS, icons, images, SIZES, FONTS, Dummy } from '../constants'

const Home = ({ navigation }) => {

  const [categories, setCategories] = useState(Dummy.categoryData)
  const [selectedCategory, setSelectedCaterogy] = useState(null)
  const [restaurants, setRestaurants] = useState(Dummy.restaurantData)
  const [currentLocation, setCurrentLocation] = useState(Dummy.initialCurrentLocation)

  const onSelectCategory = (category) => {
    // filter restaurant
    let restaurantList = Dummy.restaurantData.filter(a => a.categories.includes(category.id))
    setRestaurants(restaurantList)
    setSelectedCaterogy(category)
  }

  const getCategoryNameById = (id) => {
    let category = categories.find(a => a.id === id)
    if (category) return category.name
    return ''
  }

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center'
          }}
        >
          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View
            style={{
              width: '70%',
              height: '100%',
              backgroundColor: COLORS.lightGray3,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIZES.radius
            }}
          >
            <Text
              style={{ ...FONTS.h3 }}
            >
              {currentLocation.streetName}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding *2,
            justifyContent: 'center'
          }}
        >
          <Image
            source={icons.basket}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  const renderMainCategories = () => {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor: (selectedCategory?.id === item.id) ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: SIZES.padding,
            ...styles.shadow
          }}
          onPress={() => onSelectCategory(item)}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: (selectedCategory?.id === item.id) ? COLORS.white : COLORS.lightGray
            }}
          >
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30
              }}
            />
          </View>
          <Text
            style={{
              marginTop: SIZES.padding,
              color: (selectedCategory?.id === item.id) ? COLORS.white : COLORS.black,
              ...FONTS.body5
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )
    }

    return (
      <View
        style={{
          padding: SIZES.padding * 2
        }}
      >
        <Text
          style={{
            ...FONTS.h1
          }}
        >
          Main
        </Text>
        <Text
          style={{
            ...FONTS.h1
          }}
        >
          Categories
        </Text>
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingVertical: SIZES.padding * 2
          }}
        />
      </View>
    )
  }

  const renderRestaurantList = () => {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.padding * 2
          }}
          onPress={() => navigation.navigate('Restaurant', {
            item,
            currentLocation
          })}
        >
          <View
            style={{
              marginBottom: SIZES.padding
            }}
          >
            <Image
              source={item.photo}
              resizeMode="cover"
              style={{
                width: '100%',
                height: 200,
                borderRadius: SIZES.radius
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                height: 50,
                width: SIZES.width * 0.3,
                backgroundColor: COLORS.white,
                borderTopRightRadius: SIZES.radius,
                borderBottomLeftRadius: SIZES.radius,
                alignItems: 'center',
                justifyContent: 'center',
                ...styles.shadow
              }}
            >
              <Text
                style={{
                  ...FONTS.h4
                }}
              >
                {item.duration}
              </Text>
            </View>
          </View>
          {/* Restaurant info */}
          <Text
            style={{
              ...FONTS.body2
            }}
          >
            {item.name}
          </Text>
          <View
            style={{
              marginTop: SIZES.padding,
              flexDirection: 'row'
            }}
          >
            {/* Rating */}
            <Image
              source={icons.star}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.primary,
                marginRight: 10
              }}
            />
            <Text
              style={{
                ...FONTS.body3
              }}
            >
              {item.rating}
            </Text>
            {/* Categories */}
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10
              }}
            >
              {
                item.categories.map((categoryId) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row'
                      }}
                      key={categoryId}
                    >
                      <Text
                        style={{
                          ...FONTS.body3
                        }}
                      >
                        {getCategoryNameById(categoryId)}
                      </Text>
                      <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>
                    </View>
                  )
                })
              }
              {/* Price */}
              {
                [1, 2, 3].map((priceRating) => (
                  <Text
                    key={priceRating}
                    style={{
                      ...FONTS.body3,
                      color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray
                    }}
                  >
                    $
                  </Text>
                ))
              }
            </View>
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <FlatList
        data={restaurants}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30
        }}
      />
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
      {renderRestaurantList()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1
  }
})

export default Home