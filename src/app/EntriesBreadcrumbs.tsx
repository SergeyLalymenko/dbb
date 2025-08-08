import { Fragment } from 'react';
import { PathConfigType } from './TabEntries';

type PropsType = {
    pathConfig: PathConfigType;
    setPathConfig: (pathConfig: PathConfigType) => void;
};

type PathItemsType = {
    pathLower: string;
    pathDisplay: string;
    currentDisplay: string;
};

function EntriesBreadcrumbs({ pathConfig, setPathConfig }: PropsType) {
    function renderBreadcrumbs() {
        const pathLowerItems = pathConfig.pathLower.split('/');
        const pathDisplayItems = pathConfig.pathDisplay.split('/');
        const pathItems = pathLowerItems.reduce<PathItemsType[]>((acc, _, i) => {
            const currentLower = pathLowerItems[i];
            const currentDisplay = pathDisplayItems[i];
            const prevPathLower = acc.length ? `${acc[acc.length - 1].pathLower}/` : '';
            const prevPathDisplay = acc.length ? `${acc[acc.length - 1].pathDisplay}/` : '';
            const pathLower = prevPathLower + currentLower;
            const pathDisplay = prevPathDisplay + currentDisplay;
            return [
                ...acc,
                {
                    pathLower,
                    pathDisplay,
                    currentDisplay,
                },
            ];
        }, []);
        return pathItems.map(({ pathLower, pathDisplay, currentDisplay }, i) => (
            <Fragment key={pathLower}>
                {i !== 0 && <div>-</div>}
                <p
                    className="font-semibold transition-all duration-200 cursor-pointer hover:text-blue-700"
                    onClick={() => onPathClick({ pathLower, pathDisplay })}
                >
                    {currentDisplay}
                </p>
            </Fragment>
        ));
    }

    function onPathClick(newPathConfig: PathConfigType) {
        if (pathConfig.pathLower === newPathConfig.pathLower) return;

        setPathConfig(newPathConfig);
    }

    return <div className="flex items-center gap-2">{renderBreadcrumbs()}</div>;
}

export default EntriesBreadcrumbs;
