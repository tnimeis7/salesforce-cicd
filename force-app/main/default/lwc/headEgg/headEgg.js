import { LightningElement, wire, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation'; // Import NavigationMixin
import { getListUi } from 'lightning/uiListApi';


const ACCOUNT_OBJECT = 'Account';
const LIST_VIEW_NAME = 'AllAccounts';

export default class HeadEgg  extends NavigationMixin(LightningElement)  {
    accounts = [];
    error;
    @api recordId;
    @wire(getListUi, { objectApiName: ACCOUNT_OBJECT, listViewApiName: LIST_VIEW_NAME })
    wiredListView({ error, data }) {
        if (data) {
            this.accounts = data.records.records.map(record => ({
                id: record.id,
                name: record.fields.Name.value,
            }));
            this.error = undefined;
        } else if (error) {
            this.accounts = [];
            this.error = error;
        }
    }
    handleAccountClick(event) {
        console.log('Account clicked:', event.currentTarget.dataset.id);
        const accountId = event.currentTarget.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: accountId,
                objectApiName: 'Account',
                actionName: 'view'
            }
        });
    }
}