import { setupWorker } from 'msw/browser'
import { userHandlers } from './userHandlers'
import { postHandlers } from './postHandlers'
import { messageHandlers } from './messageHandlers'
import { modHandlers } from './modHandlers'
import { notificationHandlers } from './notificationHandlers'
import { chatHandlers } from './chatHandlers'
import { subredditHandlers } from './subredditHandlers'



export const worker = setupWorker(...userHandlers, ...postHandlers, ...subredditHandlers, ...messageHandlers, ...modHandlers, ...notificationHandlers, ...chatHandlers)