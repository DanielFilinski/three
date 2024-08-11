import {AnyAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios, {AxiosResponse} from "axios";
import {getAllIds} from "../service";
import {Writable} from "stream";


export const getData = createAsyncThunk<dataInt, undefined, {rejectValue: string}>(
  'store/getData',
  async function(_, {rejectWithValue})  {

  const response = await axios.get('https://test.vmarmysh.com/api.user.tree.get?treeName=FilinSkyTree')

  if (response.status !== 200) {
      console.log('response',response)
    return rejectWithValue('Fail get data...')
  }
      console.log('response.data',response.data)
      console.log('response',response)
   return (response.data) as dataInt
  }
)

export const addItem = createAsyncThunk<dataInt, {treeName: string, nodeName: string, parentNodeId: number}, {rejectValue: string}>(
  'store/addItem',
  async function({treeName, parentNodeId, nodeName}, {rejectWithValue})  {
      try {
          const response = await axios.post(`https://test.vmarmysh.com/api.user.tree.node.create?treeName=${treeName}&parentNodeId=${parentNodeId}&nodeName=${nodeName}`);
          return (response.data) as dataInt

      } catch (error) {
          return rejectWithValue('Fail added item...') // Выполняется в случае ошибки
      }

  }
)
export const renameItem = createAsyncThunk<dataInt, {treeName: string, newNodeName: string, nodeId: number}, {rejectValue: string}>(
  'store/renameItem',
  async function({treeName, nodeId, newNodeName}, {rejectWithValue})  {
      try {
          const response = await axios.post(`https://test.vmarmysh.com/api.user.tree.node.rename?treeName=${treeName}&nodeId=${nodeId}&newNodeName=${newNodeName}`);
          return (response.data) as dataInt

      } catch (error) {
          return rejectWithValue('Fail rename item...') // Выполняется в случае ошибки
      }

  }
)
export const deleteItem = createAsyncThunk<dataInt, {treeName: string, nodeId: number}, {rejectValue: string}>(
  'store/deleteItem',
  async function({treeName, nodeId}, {rejectWithValue})  {

      try {
          const response = await axios.post(`https://test.vmarmysh.com/api.user.tree.node.delete?treeName=${treeName}&nodeId=${nodeId}`);
          return (response.data) as dataInt

          //@ts-ignore
      } catch (error: AxiosResponse) {
              console.log('error dell', error.response.data.data.message)
          return rejectWithValue(error.response.data.data.message)   // Выполняется в случае ошибки
      }

  }
)

export interface dataInt {
  id: number,
  name: string,
  children: dataInt[]
}

interface storeInt {
    currentItem:{
        typeModal: 'add' | 'rename' | 'delete',
        name: string,
    },
    currentModalValue: {
        title: string,
        value: string,
        placeholder: string
    },
    isModalOpen: boolean,
    treeName: string,
    expandedItems: number [],
    selectedItemId: number,
    status: 'pending' | 'resolved' | 'rejected' | 'added' | 'firstStart',
    error: null | string,
    data: dataInt

}

const initialState: storeInt = {
    currentItem:{
        typeModal: 'add',
        name: ''
    },
    currentModalValue: {
        title: '',
        value: '',
        placeholder: '',
    },
    isModalOpen: false,
    treeName: "FilinSkyTree",
    expandedItems: [0],
    selectedItemId: 0,
    status: 'firstStart',
    error:  'string',
    data: {
        id: 16927,
        name: 'FilinSkyTree',
        children: []
    }
}

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    handleToggle: (state, action: PayloadAction<number>) => {
      state.selectedItemId = action.payload

      if (state.expandedItems.includes(action.payload)) {
        state.expandedItems = state.expandedItems.filter((id) => id !== action.payload)
      } else {
        state.expandedItems = [...state.expandedItems, action.payload]
      }
    },

    openModal: (state, action: PayloadAction<{typeModal: 'add' | 'rename' | 'delete', name: string }>) => {
      state.isModalOpen = true
      state.currentItem.typeModal = action.payload.typeModal
      state.currentItem.name = action.payload.name

        switch (action.payload.typeModal) {
            case 'add':
                state.currentModalValue.title = ''
                state.currentModalValue.placeholder = 'Node Name'
                state.currentModalValue.value = ''
                break;
            case 'rename':
                state.currentModalValue.title = 'New Node Name'
                state.currentModalValue.value = action.payload.name
                break;
            case 'delete':
                state.currentModalValue.title = ''
                state.currentModalValue.placeholder = ''
                // state.currentModalValue.value = action.payload.name
                break;
            default:
                alert( "Нет таких значений" );
        }

    },

    closeModal: (state, ) => {
      state.isModalOpen = false
    },
    collapsAll: (state, ) => {
        state.expandedItems = []
    },
    expandAll: (state,action: PayloadAction<dataInt> ) => {
       const idsArr: number[] = [];
       getAllIds([action.payload], idsArr)
       state.expandedItems = idsArr
    },
    setModalInputValue: (state,action: PayloadAction<string> ) => {
      state.currentModalValue.value = action.payload
    },
    setModalTitle: (state,action: PayloadAction<string> ) => {
        state.currentModalValue.title = action.payload
    },

  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getData.pending, (state) => {
        state.status = 'pending'
        state.error = null
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = 'resolved'
      })

      .addCase(addItem.pending, (state) => {
        state.status = 'pending'
        state.error = null
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.status = 'added'
      })

      .addCase(renameItem.pending, (state) => {
        state.status = 'pending'
        state.error = null
      })
      .addCase(renameItem.fulfilled, (state, action) => {
        state.status = 'added'
      })

      .addCase(deleteItem.pending, (state) => {
        state.status = 'pending'
        state.error = null
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.status = 'added'
      })



      .addMatcher(isError, (state, action: PayloadAction<string>) => {
          console.log('isEr',action.payload)
        state.error = action.payload
        state.status = 'rejected'
      })
  },
})

// Action creators are generated for each case reducer function
export const {setModalTitle, setModalInputValue, expandAll,collapsAll,closeModal, openModal, handleToggle} = storeSlice.actions
export default storeSlice.reducer

function isError(action: AnyAction){
  return action.type.endsWith('rejected')
}
