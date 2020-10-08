import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { actionCreators } from '../store/Product';

class ProductList extends Component {

    constructor() {
        super();
        this.state = {};
        this.onProductSelect = this.onProductSelect.bind(this);
        this.dialogHide = this.dialogHide.bind(this);
        this.addNew = this.addNew.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate() {
        // This method is called when the route parameters change
        if (this.props.forceReload) {
            this.fetchData();
        }
    }

    fetchData() {
        this.props.requestProducts();
    }

    updateProperty(property, value) {
        let product = this.state.product;
        product[property] = value;
        this.setState({ product: product });
    }

    onProductSelect(e) {
        this.newProduct = false;
        this.setState({
            displayDialog: true,
            product: Object.assign({}, e.data)
        });
    }

    dialogHide() {
        this.setState({ displayDialog: false });
    }

    addNew() {
        this.newProduct = true;
        this.setState({
            product: { name: '', price: ''},
            displayDialog: true
        });
    }

    save() {
        this.props.saveProduct(this.state.product);
        this.dialogHide();
        this.growl.show({
            severity: 'success', detail: this.newProduct ?
                "Data Saved Successfully" : "Data Updated Successfully"
        });
    }

    delete() {
        this.props.deleteProduct(this.state.product.productId);
        this.dialogHide();
        this.growl.show({ severity: 'error', detail: "Data Deleted Successfully" });
    }

    render() {

        let header = <div className="p-clearfix"
            style={{ lineHeight: '1.87em' }}>CRUD for Product </div>;

        let footer = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ float: 'left' }} label="Add"
                icon="pi pi-plus" onClick={this.addNew} />
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Close" icon="pi pi-times" onClick={this.dialogHide} />
            <Button label="Delete" disabled={this.newProduct ? true : false}
                icon="pi pi-times" onClick={this.delete} />
            <Button label={this.newProduct ? "Save" : "Update"} icon="pi pi-check"
                onClick={this.save} />
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <DataTable value={this.props.products} selectionMode="single"
                    header={header} footer={footer}
                    selection={this.state.selectedProduct}
                    onSelectionChange={e => this.setState
                        ({ selectedProduct: e.value })} onRowSelect={this.onProductSelect}>
                    <Column field="productId" header="ID" />
                    <Column field="name" header="Name" />
                    <Column field="price" header="Price" />
                </DataTable>
                <Dialog visible={this.state.displayDialog} style={{ 'width': '380px' }}
                    header="Product Details" modal={true} footer={dialogFooter}
                    onHide={() => this.setState({ displayDialog: false })}>
                    {
                        this.state.product &&

                        <div className="p-grid p-fluid">

                            <div><label htmlFor="name">Name</label></div>
                            <div>
                                <InputText id="name" onChange={(e) => { this.updateProperty('name', e.target.value) }}
                                    value={this.state.product.name} />
                            </div>
                            
                            <div style={{ paddingTop: '10px' }}>
                                <label htmlFor="price">Price</label></div>
                            <div>
                                <InputText type="number" id="price" onChange={(e) => { this.updateProperty('price', e.target.value) }}
                                    value={this.state.product.price} />
                            </div>
                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

// Make products array available in  props
function mapStateToProps(state) {
    //console.log("state.products.products");
    //console.log(state);
    return {
        products: state.products.products,
        loading: state.products.loading,
        errors: state.products.errors,
        forceReload: state.products.forceReload
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ProductList);