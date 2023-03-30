import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import '../../css/Form.scss';
import SummaryStatsResults from "./SummaryStatsResults";

type SummaryStats = {
    [index: string]: number,
    Count: number,
    Maximum: number,
    Mean: number,
    Median: number,
    Minimum: number,
    Mode: number,
    Range: number,
    Standard_Deviation: number,
    Sum: number,
    Variance: number
}

const SummaryStatsForm = () => {
    const [ numbers, setNumbers ] = useState([]);
    const [ results, setResults ] = useState<SummaryStats>();

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        const input = (event.target as HTMLFormElement).getElementsByTagName('textarea')[0];
        const value = input.value;

        if (checkInput(value)) {
            const numbers: number[] = parseNumbers(value);
            setNumbers(numbers);
            const payload: { numbers: number[] } = {
                "numbers": numbers
            }
    
            axios.post("/summary_statistics", payload)
                .then((res) => {
                    console.log(res);
                    setResults(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            window.alert("Please check your input");
        }
    }

    const checkInput = (str: string): boolean => {
        const regex = /^[\s,0-9]*[\s0-9]$/;
        
        return regex.test(str);
    }

    const parseNumbers = (str: string): number[] => {
        const valuesArray = str.split(",");

        return valuesArray.map((num) => {
            return Number(num);
        });
    }

    const handleChange = (event: SyntheticEvent) => {
        const regex = /^[,0-9]*[0-9]$/;

        if (regex.test((event.target as HTMLTextAreaElement).value)) {
            
        }
    }

    return (
        <div>
            <h1>Summary Stats</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-item">
                    <label htmlFor="values-box">Enter a comma-separated list of values</label>
                    <textarea name="values-box" id='values-box' onChange={handleChange} required />

                    <button className="submit-btn">Submit</button>
                </div>
                
            </form>

            {
                results && <SummaryStatsResults summaryStats={results} />
            }
        </div>
    )
}

export { SummaryStats };
export default SummaryStatsForm;