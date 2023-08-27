const help = (argv) => {
  console.log(`
  simple-cli has two command line tools:

    1) copy        -- used for Coping template from local file
    2) create     -- used for Creating frame template from Git repo

  Detailed usage:

    1) copy <sub-command>
    
      description: Runs the copy prompter, asking you questions so that you
                  can choose different options to create your template, which
                  will also automatically install dependencies .
      args:
        --name    Project name
    
    2) create <sub-command>

        description: Selecting different branches from Git repo to initialize new projects.

        args:
          --name    Project name
          --force   Overwrite target directory if it is existed

  `)
}

export default help