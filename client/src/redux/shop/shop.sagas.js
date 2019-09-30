import { takeLatest, call, put, all } from 'redux-saga/effects';
import ShopActionTypes  from './shop.type';
import { firestore, convertCollectionsSnapchotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';


export function* fetchCollectionAsync(){
	try{
		const collectionRef = firestore.collection('collections');
		const snapshot = yield collectionRef.get();
		const collectionsMap = yield call(convertCollectionsSnapchotToMap, snapshot);
		yield put(fetchCollectionsSuccess(collectionsMap));
	}catch (error){
		yield put(fetchCollectionsFailure(error.message));
	}
	
	//old way //
		// collectionRef.get().then( snapshot => {
		// 	const collectionsMap = convertCollectionsSnapchotToMap(snapshot);
		// 	dispatch(fetchCollectionsSuccess(collectionsMap));
		// }).catch(error=> dispatch(fetchCollectionsFailure(error.message)));
}

export function* fetchCollectionsStart(){
	yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionAsync);
}

export function* shopSagas(){
	yield all([call(fetchCollectionsStart)]);
}