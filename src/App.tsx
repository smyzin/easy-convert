import { MouseEvent, useEffect, useState } from 'react';
import { WithLayout } from './layout/Layout';

import styles from './layout/Layout.module.css';
import './styles/global.css';

import {
	Description, TextField
} from './components';

import { initConverting } from './utils/converter/index';
const json = require('./utils/test.json')

function App(): JSX.Element {
	const [valueJSON, setValueJson] = useState<string>('');
	const [valueTS, setValueTS] = useState<string>('');

	useEffect(() => {
		constructValueTS(valueTS)
	}, [valueTS]);

	useEffect(() => {
		constructValueJSON(valueJSON)
	}, [valueJSON]);

	const constructValueJSON = (jsonObj: string) => {
		if (setValueJson) setValueJson(jsonObj)
	}

	const constructValueTS = (ts: string) => {
		if (setValueTS) setValueTS(ts)
	};

	const clickConvert = function (e: MouseEvent) {
		e.preventDefault();

		const result = initConverting(valueJSON);
		constructValueTS(result);
	}

	const setTest = (e: MouseEvent) => {
		e.preventDefault();

		constructValueJSON(JSON.stringify(json, undefined, 2))
	}


	return (
		<>
			<Description />
			<div className={styles.col_2m}>
				<TextField
					name="json-field"
					type="json"
					value={valueJSON}
					setValue={setValueJson}
				></TextField>
				<button className="button round green-light button__mark" title="Set a test JSON" onClick={setTest}>?</button>
				<button className="button primary button__submit" onClick={clickConvert}>Convert it</button>
				<TextField
					name="ts-field"
					type="ts"
					value={valueTS}
					setValue={setValueTS}
				></TextField>
			</div>
		</>
	);
}

export default WithLayout(App)
