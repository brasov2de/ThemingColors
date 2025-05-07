
import { BorderRadiusTokens, BrandVariants, Theme, createDarkTheme } from "@fluentui/react-components";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import {  IThemingProps, Theming } from "./Theming";
import * as React from "react";
import { OutputThemeSchema } from "./Schema/OutputThemeSchema";
import { TExtendedTheme } from "./Schema/types";

export class ThemingColors implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;    
    private events: string[] = [];
    private theme : Theme & TExtendedTheme | undefined = undefined;
    private context: ComponentFramework.Context<IInputs>;    

    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }

    private changeColor = (newTheme: Theme & TExtendedTheme) => {
        this.events.push("OnColorChange");     
        this.theme = newTheme;
        this.notifyOutputChanged();
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.context = context;
        window.setTimeout(() => {
            this.events.push("OnColorChange");
            this.notifyOutputChanged();
        }, 2000);
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
                     
        const props: IThemingProps = { 
            onChange: this.changeColor, 
            theme: this.context.fluentDesignLanguage?.tokenTheme as Theme,
            isDarkMode : this.context.parameters.isDarkMode.raw ?? false,
            brand: this.context.fluentDesignLanguage?.brand as BrandVariants,
            accent1BackgroundColor: this.context.parameters.accent1Background.raw ?? undefined,
            accent1ForegroundColor: this.context.parameters.accent1Foreground.raw ?? undefined,
            accent1BorderColor: this.context.parameters.accent1Border.raw ?? undefined,
            accent2BackgroundColor: this.context.parameters.accent2Background.raw ?? undefined,
            accent2ForegroundColor: this.context.parameters.accent2Foreground.raw ?? undefined,
            accent2BorderColor: this.context.parameters.accent2Border.raw ?? undefined
         };
        return React.createElement(
            Theming, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        if(this.events.length > 0){
            window.setTimeout(() => {
            this.context.events.OnColorChanged();
            this.events = [];
            }, 500);
        }
        return {  
           OutputTheme: this.theme
          
        };
    }


    public async getOutputSchema(context: ComponentFramework.Context<IInputs>): Promise<Record<string, unknown>> {
        return Promise.resolve({
            OutputTheme: OutputThemeSchema
        });
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
