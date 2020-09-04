import * as React from 'react';
import styles from './Module01Demo01.module.scss';
import { IModule01Demo01Props } from './IModule01Demo01Props';
import { escape } from '@microsoft/sp-lodash-subset';

export default class Module01Demo01 extends React.Component<IModule01Demo01Props, {}> {
  public render(): React.ReactElement<IModule01Demo01Props> {
    return(
      <div className={styles.module01Demo01}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.description)}</p>
              <a href='https://aka.ms/spfx' className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
