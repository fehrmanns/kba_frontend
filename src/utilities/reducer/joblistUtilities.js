
export function determineProgressForGroup(group, listWithStates) {
    const groupToModify = Object.assign({}, group);
    let statusList = [];
    if (!listWithStates) {
        statusList = groupToModify.kbaJobStatusCountDtoList;
    } else {
        statusList = [...listWithStates];
    }
    const statusListLength = statusList.length;
    let hasFailedJobs = false;
    let hasCompletedJobs = false;
    let hasRunningJobs = false;
    let value = 0;
    for (let j = 0; j < statusListLength; j += 1) {
        switch (statusList[j].groupedKbaJobStatus) {
            case "INITIALIZED":
                hasRunningJobs = true;
                value += 5 * statusList[j].count;
                break;
            case "EN_ROUTE_TO_QUEUE":
                hasRunningJobs = true;
                value += 20 * statusList[j].count;
                break;
            case "DEQUEUED":
                hasRunningJobs = true;
                value += 35 * statusList[j].count;
                break;
            case "EN_ROUTE_TO_FFMPEG":
                hasRunningJobs = true;
                value += 50 * statusList[j].count;
                break;
            case "EN_ROUTE_TO_BS3_AUDIO":
                hasRunningJobs = true;
                value += 65 * statusList[j].count;
                break;
            case "EN_ROUTE_TO_BS3_NO_AUDIO":
                hasRunningJobs = true;
                value += 80 * statusList[j].count;
                break;
            case "PARTIALLY_COMPLETED":
                hasRunningJobs = true;
                value += 100 * statusList[j].count;
                break;
            case "FAILED":
                hasFailedJobs = true;
                value += 100 * statusList[j].count;
                break;
            case "COMPLETED":
                hasCompletedJobs = true;
                value += 100 * statusList[j].count;
                break;
            default:
                break;
        }
    }

    const groupProgressPercent = value / groupToModify.groupCount;
    let groupState = "COMPLETED";
    if (hasRunningJobs && (hasCompletedJobs || hasFailedJobs)) {
        groupState = "PARTIALLY_COMPLETED";
    } else if (hasRunningJobs) {
        groupState = "RUNNING";
    } else if (hasFailedJobs) {
        groupState = "FAILED";
    }

    groupToModify.groupProgressPercent = groupProgressPercent;
    groupToModify.groupState = groupState;
    return groupToModify;
}

export function determineGroupProgress(list) {
    const joblist = [...list];

    const listLength = list.length;
    for (let i = 0; i < listLength; i += 1) {
        if (joblist[i].groupName) {
            const groupToModify = determineProgressForGroup(joblist[i]);
            joblist[i] = groupToModify;
        }
    }
    return joblist;
}

function mergeChildrenStates(children) {
    const childrenNo = children.length;
    const results = {};
    for (let j = 0; j < childrenNo; j += 1) {
        if (!results[children[j].kbaJobStatus]) {
            results[children[j].kbaJobStatus] = 1;
        } else {
            results[children[j].kbaJobStatus] += 1;
        }
    }
    const states = [];
    Object.keys(results).forEach((key) => {
        states.push({groupedKbaJobStatus: key, count: results[key]});
    });
    return states;
}

export function addChildrenToGroup(groupToFetch, children, list) {
    const joblist = [...list];

    const listLength = list.length;
    for (let i = 0; i < listLength; i += 1) {
        if (joblist[i].groupName === groupToFetch) {
            joblist[i].children = children;
            joblist[i].groupCount = children.length;
            const newStates = mergeChildrenStates(joblist[i].children);
            joblist[i] = determineProgressForGroup(joblist[i], newStates);
            return joblist;
        }
    }
    return joblist;
}

export function refreshJob(reloadedJob, list, refreshOnlyGroup) {
    const joblist = [...list];

    const listLength = list.length;
    if (reloadedJob.groupName && !refreshOnlyGroup) {//refresh group child
        for (let i = 0; i < listLength; i += 1) {
            if (joblist[i].groupName === reloadedJob.groupName) {
                const children = [...joblist[i].children];
                const childrenNo = children.length;
                for (let j = 0; j < childrenNo; j += 1) {
                    if (children[j].name === reloadedJob.name) {
                        children[j] = reloadedJob;
                        break;
                    }
                }
                joblist[i].children = children;
                const newStates = mergeChildrenStates(joblist[i].children);
                joblist[i] = determineProgressForGroup(joblist[i], newStates);
                return joblist;
            }
        }
    } else {//refresh single job or group
        for (let i = 0; i < listLength; i += 1) {
            if (joblist[i].name === reloadedJob.name) {
                joblist[i] = reloadedJob;
                return joblist;
            }
        }
    }
    return joblist;
}
