import * as React from 'react';
import { Label } from '@fluentui/react-components';

export interface IHelloWorldProps {
  onChange: (value: string) => void;
}

export const HelloWorld: React.FunctionComponent<IHelloWorldProps> = ({onChange}: IHelloWorldProps) => {
    return (
      <Label onClick={() => {onChange("#00ff00")}}>
        Hello!
      </Label>
    )
  
}
