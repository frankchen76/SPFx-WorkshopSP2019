import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'Module04DataAccessWebPartStrings';
import Module04DataAccess from './components/Module04DataAccess';
import { IModule04DataAccessProps } from './components/IModule04DataAccessProps';
import { setup as pnpSetup } from "@pnp/common";

export interface IModule04DataAccessWebPartProps {
  description: string;
}

export default class Module04DataAccessWebPart extends BaseClientSideWebPart<IModule04DataAccessWebPartProps> {

  protected onInit(): Promise<void> {

    return super.onInit().then(_ => {

      // other init code may be present

      pnpSetup({
        spfxContext: this.context
      });
      // sp.setup({
      //     // set ie 11 mode
      //     ie11: true,
      //     // only needed when working within SharePoint Framework
      //     spfxContext: this.context
      // });
    });
  }

  public render(): void {
    const element: React.ReactElement<IModule04DataAccessProps> = React.createElement(
      Module04DataAccess,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
