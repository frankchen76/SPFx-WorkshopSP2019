import * as React from 'react';
import styles from './Module04DataAccess.module.scss';
import { IModule04DataAccessProps } from './IModule04DataAccessProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IModule04DataAccessState } from './IModule04DataAccessState';
import { PrimaryButton, Spinner, SpinnerSize } from 'office-ui-fabric-react';
import { IOrderService } from '../../../services/Order/IOrderService';
import { SPOOrderService } from '../../../services/Order/SPOOrderService';

export default class Module04DataAccess extends React.Component<IModule04DataAccessProps, IModule04DataAccessState> {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      message: undefined
    };
  }
  private _testHandler = (): void => {
    let iService: IOrderService = new SPOOrderService();
    this.setState({ loading: true });
    iService.getOrders().then(result => {
      this.setState({
        loading: false,
        message: JSON.stringify(result)
      });
    });
  }

  public render(): React.ReactElement<IModule04DataAccessProps> {
    return (
      <div className={styles.module04DataAccess}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.description)}</p>
              <PrimaryButton text='Test' onClick={this._testHandler} />
              {this.state.loading &&
                <Spinner size={SpinnerSize.large} label='loading...' />
              }
            </div>
          </div>
          {this.state.message &&
            <div className={styles.row}>
              <div className={styles.columnResult}>
                {this.state.message}
              </div>
            </div>
          }
        </div>      </div >
    );
  }
}
