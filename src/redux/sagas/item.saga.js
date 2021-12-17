import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchItem () {
    try {
        const response = yield axios({
            method: 'GET',
            url: '/api/shelf'
        })
        yield put({
            type: 'SET_ITEM',
            payload: response.data
        })
    } catch(err) {
        console.error('fetchItems error', error)
    }
};

function* createItem (action) {
    try {
        const response = yield axios({
            method: 'POST',
            url: 'api/shelf',
            data: action.payload
        })
        yield put({ type: 'FETCH_ITEM'})
    } catch(err) {
        console.error('Create Item error', err)
    }
}

function* deleteItem(action){
    try{
        console.log('deleteItem action.payload', action.payload);
        const response = yield axios({
            method:'DELETE',
            url: `api/shelf/${action.payload}`
        })
        yield put ({
            type: 'FETCH_ITEM'
        })
    } catch (err) {
        console.error('deleteItem error:', err);
    };
}


function* itemSaga () {
    yield takeLatest('FETCH_ITEM', fetchItem);
    yield takeLatest('CREATE_ITEM', createItem);
    yield takeLatest('DELETE_ITEM', deleteItem);
}

export default itemSaga;