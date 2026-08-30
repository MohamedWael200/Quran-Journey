function GardenTree({
                        points = 0,
                        pointsPerTree = 100,
                        isCompleted = false,
                    }) {
    const progress = Math.min(
        Math.round(
            (points / pointsPerTree) * 100
        ),
        100
    );

    let stage = "seed";

    if (isCompleted || progress >= 100) {
        stage = "full";
    } else if (progress >= 75) {
        stage = "large";
    } else if (progress >= 50) {
        stage = "medium";
    } else if (progress >= 25) {
        stage = "small";
    }

    return (
        <div
            className={`garden-tree garden-tree-${stage}`}
            title={`${progress}%`}
        >
            <div className="tree-shadow" />

            <div className="tree-container">
                <div className="tree-leaves leaves-back" />

                <div className="tree-trunk" />

                <div className="tree-leaves leaves-main" />

                <div className="tree-leaves leaves-front" />
            </div>
        </div>
    );
}

export default GardenTree;