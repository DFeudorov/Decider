import {JobResultTable} from "./job-result-table";
import {Policy} from "sd-computations/src/policies/policy";
import {log} from "sd-utils";
var jQuery = require('jquery');


export class ProbabilisticSensitivityAnalysisJobResultTable extends JobResultTable {

    constructor(container, config, appDataModel){
        super(container, config);

    }

    setData(jobResult, jobParameters, job) {
        this.jobResult = jobResult;
        var data = {rows: ['policy', 'expected value', 'median', 'standard deviation', 'best probability'], cols: [], vals: ['expected value'], data: []};


        data.data.push(['policy', 'expected value', 'median', 'standard deviation', 'best probability']);
        jobResult.policies.forEach((policy, i)=> {
            var row = [
                Policy.toPolicyString(policy, jobParameters.values.extendedPolicyDescription),
                jobResult.expectedValues[i],
                jobResult.medians[i],
                jobResult.standardDeviations[i],
                jobResult.policyIsBestProbabilities[i]
            ];
            data.data.push(row);
        });

        log.trace(data);
        super.setData(data)
    }

    clickCallback(e, value, filters, pivotData) {
        var self=this;
        var selectedIndexes = [];
        var selectedRows = [];
        pivotData.forEachMatchingRecord(filters, record=> {
            selectedIndexes.push(record['$rowIndex']);
            selectedRows.push({policyIndex: record['$rowIndex']});
        });
        self.config.onRowSelected(selectedRows, selectedIndexes, e)

    }
}
