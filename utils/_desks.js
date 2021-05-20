import AsyncStorage from '@react-native-async-storage/async-storage';
//import { getMetricMetaInfo, timeToString } from './helpers'

export const FLACH_STORAGE_KEY = 'Flachcard:desk'

function getRandomNumber (max) {
  return Math.floor(Math.random() * max) + 0
}

 function getDecksInfo (deck) {
    let decks = {
      React: {
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ],

       
      },
      free: {
        title: 'free',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ],
       
      },
      look: {
        title: 'look',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ],

       
      },

      JavaScript: {
        title: 'JavaScript',
        questions: [
          {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
          }
        ],
        }
    }
    return typeof deck === 'undefined' ? decks : decks[deck]
    }

function setDummyData () {
    let dummyData = getDecksInfo()
    AsyncStorage.setItem(FLACH_STORAGE_KEY, JSON.stringify(dummyData))
    return dummyData
}

function setMissingDates (results) {
  return results
}

export function formatDeskResults (results) {
  return results === null
    ? setDummyData()
    : setMissingDates(JSON.parse(results))
}