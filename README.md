"# react" 
Steps for the Deployment
The following steps must be followed in serial-wise.

"#We will create a seperate gh-pages branch that will contain our /dist folder."

Push your code to your repository (using Terminal)
cd to your Vite App.

Run the following commands in your Terminal
* $ git init
* $ git add .
* $ git commit -m "first-commit"
* $ git branch -M main
* $ git remote add origin http://github.com/username/repo-name.git
* $ git push -u origin main

Now, you will able to see your code in your repository.

#Deploying (Static)
Go to your vite.config.js file. And add your base url to it.
Code

To be more precise, your base url will be /repo-name/.
In my case, my repo-name is Tech-To. So, my base url will be /Tech-To/.

export default defineConfig({
  base : '/repo-name/',
  plugins: [react()]
})

* Run npm run build in your Terminal.
-By default, the build output will be placed at dist. You may deploy this dist folder to any of your -preferred platforms.

* Add /dist folder into your repo. By running.
$ git add dist -f

-f is required, as your .gitignore will not consider your /dist folder. Hence, it is required for git to consider it as well.

Run $ git commit -m "Adding dist" in your Terminal.

Run $ git subtree push --prefix dist origin gh-pages

Your Deployed website
Visit your repository.
Go to Settings.
Scroll down to Pages.
There will be a link to your website.