import AsyncStorage from '@react-native-async-storage/async-storage';
 import * as Permissions from 'expo-permissions';
 import * as Notifications from 'expo-notifications'; 
// import { Notifications } from 'expo'

import { FLACH_STORAGE_KEY, formatDeskResults } from './_desks';
const NOTIFICATION_KEY = 'UdaciFitness:notifications'



export function getDailyReminderValue () {
  return {
    today: "👋 Don't forget to take task today!"
  }
}



export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}


function createNotification () {
  return {
    title: 'Log your stats!',
    body: " 👋 Don't forget to do task today! ",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}



export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export function getDecks () {
    return AsyncStorage.getItem (FLACH_STORAGE_KEY).then (results =>
        formatDeskResults (results)
    );
  }
  
  export function getDeck (id) {
    return AsyncStorage.getItem (FLACH_STORAGE_KEY)
      .then (deck => {
        return JSON.parse (deck)[id];
      })
     
  }
  
  export function saveDeckTitle (title) {
    return AsyncStorage.mergeItem (
        FLACH_STORAGE_KEY,
      JSON.stringify ({
        [title]: {
          title,
          questions: [],
        },
      })
    );
  }
  
  export function saveCardToDeck (deckTitle, card) {
    getDeck (deckTitle).then (deck => {
      return AsyncStorage.mergeItem (
        FLACH_STORAGE_KEY,
        JSON.stringify ({
          [deckTitle]: {
            ...deck,
            questions: [...deck.questions, card],
          },
        })
      );
    });
  }
  
