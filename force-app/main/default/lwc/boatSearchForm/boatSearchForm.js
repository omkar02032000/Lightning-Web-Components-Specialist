// imports
// import getBoatTypes from the BoatDataService => getBoatTypes method';
import { LightningElement, wire } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class BoatSearchForm extends LightningElement {

	selectedBoatTypeId = '';

	// Private
	error = undefined;

	searchOptions;

	// Wire a custom Apex method
	@wire(getBoatTypes)
	boatTypes({ data, error }) {
		if (data) {
			this.searchOptions = data.map(type => {
				return { label: type.Name, value: type.Id };
			});
			this.searchOptions.unshift({ label: 'All Types', value: '' });
		} else if (error) {
			this.searchOptions = undefined;
			this.error = error;
			console.log('Error Occurred: ' + error);
		}
	}

	// Fires event that the search option has changed.
	// passes boatTypeId (value of this.selectedBoatTypeId) in the detail
	handleSearchOptionChange(event) {
		this.selectedBoatTypeId = event.detail.value
		// Create the const searchEvent
		const searchEvent = new CustomEvent('search', {
			detail: {
				boatTypeId: this.selectedBoatTypeId
			}
		});
		// searchEvent must be the new custom event search
		searchEvent;
		console.log('searchEvent.detail.boatTypeId: ' + searchEvent.detail.boatTypeId);
		this.dispatchEvent(searchEvent);
	}
}