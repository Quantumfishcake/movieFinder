import { FunctionComponent } from 'react';

interface inputQueryProps {
    title: string,
    updateFunc: Function,
    value: string
}

const InputQuery: FunctionComponent<inputQueryProps> = ({ title, updateFunc, value }: inputQueryProps) => {

    return (
        <>
            <div className="m-2">
                <h1 className="uppercase">{title}</h1>
                <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" value={value} onChange={(e) => updateFunc(e.target.value)} />
            </div>

        </>
    );
};

export default InputQuery;