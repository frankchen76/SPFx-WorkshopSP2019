import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'Module01Demo01WebPartStrings';
import { Module01Demo01 } from './components/Module01Demo01';
import { IModule01Demo01Props } from './components/IModule01Demo01Props';
import { setup as pnpSetup } from "@pnp/common";
import { sp } from "@pnp/sp";

export interface IModule01Demo01WebPartProps {
  description: string;
}

export default class Module01Demo01WebPart extends BaseClientSideWebPart<IModule01Demo01WebPartProps> {

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
    this.context
    const element: React.ReactElement<IModule01Demo01Props> = React.createElement(
      Module01Demo01,
      {
        description: this.properties.description,
        webpartContext: this.context
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
