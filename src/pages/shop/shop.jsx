import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CollectionsOverview from '../../components/collection-overview/collection-overview';
import CollectionPage from '../collection/collection';
import { firestore, convertCollectionsSnapchotToMap } from '../../firebase/firebase.utils';
import {updateCollections} from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/spinner/spinner'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
	state = {
		loading: true
	};

	unsubscribefromSnapshot = null;

	componentDidMount(){
		const { updateCollections } = this.props;
		const collectionRef = firestore.collection('collections');

		this.unsubsribeFromSnapShop = collectionRef.onSnapshot(async snapshot => {
			const collectionsMap = convertCollectionsSnapchotToMap(snapshot);
			updateCollections(collectionsMap);
			this.setState({loading:false});
		});
	}

	render(){
		const { match } = this.props;
		const { loading } =this.state; 
		return (
		  <div className='shop-page'>
		    <Route exact path={`${match.path}`} 
		    render ={props => (<CollectionsOverviewWithSpinner isLoading = {loading}{...props}/> )}/>
		    <Route path={`${match.path}/:collectionId`} 
		     render = {props => (<CollectionPageWithSpinner isLoading ={loading} {...props}/> )}
		     />
		  </div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);