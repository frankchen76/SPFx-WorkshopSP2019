import * as React from 'react';
import styles from './Module01Demo01.module.scss';
import { IModule01Demo01Props } from './IModule01Demo01Props';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPOOrderService } from '../../../services/Orders/SPOOrderService';
import { IOrderService } from '../../../../lib/services/Orders/IOrderService';
import { PrimaryButton, Spinner, SpinnerSize } from 'office-ui-fabric-react';

import { IOrder } from '../../../../lib/services/Orders/IOrder';

export interface IModule01Demo01State {
  loading: boolean;
  message: string;
  result: IOrder[];
}

export class Module01Demo01 extends React.Component<IModule01Demo01Props, IModule01Demo01State> {

  constructor(prop: IModule01Demo01Props) {
    super(prop);

    this.state = {
      loading: false,
      message: undefined,
      result: undefined
    }
  }

  public componentDidMount() {
  }
  public _testHandler = (): void => {
    this.setState({ loading: true });
    let service: IOrderService = new SPOOrderService(this.props.webpartContext);
    service.getOrders().then(result => {
      console.log(result);
      this.setState({
        loading: false,
        message: JSON.stringify(result, null, 4)
      });
    });
  }
  public render(): React.ReactElement<IModule01Demo01Props> {
    return (
      <div className={styles.module01Demo01}>
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
        </div>
      </div >
    );
  }
  // public render(): React.ReactElement<IModule01Demo01Props> {
  //   return (
  //     <div className={styles.module01Demo01}>
  //       <div className={styles.container}>
  //         <div className={styles.row}>
  //           <div className={styles.column}>
  //             <span className={styles.title}>Welcome to SharePoint!</span>
  //             <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
  //             <p className={styles.description}>{escape(this.props.description)}</p>
  //             <a href='https://aka.ms/spfx' className={styles.button}>
  //               <span className={styles.label}>Learn more</span>
  //             </a>
  //           </div>
  //         </div>
  //       </div>
  //     </div >
  //   );
  // }
}
