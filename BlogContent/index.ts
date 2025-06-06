
import { BorderRadiusTokens, BrandVariants, Theme, createDarkTheme } from "@fluentui/react-components";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { HelloWorld, IHelloWorldProps } from "./HelloWorld";
import * as React from "react";

export class ThemingColors implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private colorCode = "";
    private events: string[] = [];
    private colorName : string |undefined | null ;
    private context: ComponentFramework.Context<IInputs>;
    private isDarkMode  : boolean | undefined = undefined;

    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }

    private changeColor = () => {
       // this.color1 = color;
        this.events.push("OnColorChange");
        this.colorCode = this.isDarkMode===false
            ? this.context.fluentDesignLanguage?.tokenTheme?.[this.colorName ?? "colorBrandForeground1"]
            : (createDarkTheme(this.context.fluentDesignLanguage?.brand as BrandVariants) as any)?.[this.colorName ?? "colorBrandForeground1"];
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
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
       if(this.isDarkMode != this.context.parameters.isDarkMode.raw){
            this.isDarkMode  = this.context.parameters.isDarkMode.raw ?? false;
            this.changeColor();
       }
        if(context.parameters.colorName && context.parameters.colorName.raw != this.colorName){
            this.colorName = context.parameters.colorName.raw as string ?? "";
            this.changeColor();
        }
               
        const props: IHelloWorldProps = { onChange: this.changeColor };
        return React.createElement(
            HelloWorld, props
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
            }, 100);
        }
        return {  
            colorCode: this.colorCode
          
        };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
