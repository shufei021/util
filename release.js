
const execa = require("execa");
const pkg = require("./package.json");
const gitAdd = async () => {
    const { stdout } = await execa("git", ["add", "."], {
        stdio: [process.stdin, process.stdout, process.stderr],
    });
    return stdout;
};
const gitCommit = async () => {
    const { stdout } = await execa("git", ["commit", "-m",pkg.version], {
        stdio: [process.stdin, process.stdout, process.stderr],
    });
    return stdout;
};

async function release() {
    await gitAdd();
    await gitCommit();
    await execa("npm", ["run", "lib:build"], {
        stdio: "inherit",
    });
    await execa("npm", ["publish"], {
        stdio: [process.stdin, process.stdout, process.stderr],
    });
    await execa("git", ["push"], {
        stdio: [process.stdin, process.stdout, process.stderr],
    });
}
release();
