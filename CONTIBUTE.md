# How to Create a Pull Request


  - If a issue is claimed, move on to the next issue. Do not duplicate your work.
  - Click on the fork an the top to fork this repo.
  - Go to your repo where you have forked the project.
  - Hit the `clone` button on your repo of the forked repo and copy the given link.
  - On your terminal / command prompt, type 
    ```
    "git  clone [put the link here]".
    ```
  - Go into the folder via terminal / command prompt, type 
    ```
    "cd folder_name"
    ```
  - Create a new branch before making any changes, on your terminal / command prompt. To create a new branch,
    ```
    "git checkout -b <new branch name>"
    ```
  - Then make required changes and add the changes to your new branch. To add all changes,
    ```
    git add .
    ``` 
  - Then commit your changes as
    ```
    git commit -m "[type a message]"
    ```
  - Push the commit to the new branch. For example, type 
    ```
    git push origin <branch_name>
    ```
  - Go back to the Github repo.
  - You will be prompted to "Create a new Pull request"
  - Otherwise, click `new pull request` and compare between your changes and upstream.
  - Press `Create Pull Request` and that's it!

### Installation

Make sure [git](https://git-scm.com/book/id/v2/Getting-Started-Installing-Git) is installed.
