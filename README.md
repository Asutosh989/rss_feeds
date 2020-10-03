# RSS feeds collector

Here it collects the feeds of blogging website and shows it to the user. 

For now we support feed from following popular sites:
- [BBC News](http://www.bbc.com/news)
- [CNN News](http://edition.cnn.com/world)
- [Yahoo News](https://www.yahoo.com/news/)
- [NASA](https://www.nasa.gov/multimedia/imagegallery/iotd.html)
- [PC World](https://www.pcworld.com/)
- [DNA India](http://www.dnaindia.com/)
- [Times of India](https://timesofindia.indiatimes.com/)
- [Business-Standard Companies](http://www.business-standard.com/companies)

and shows it on the dashboard. choose from wide range.

## Setting up Backend
1.  Go to `rss_backend` folder as,

    ```
    cd rss_backend
    ```

2. Install the packages as,
    ```
    $ npm install
    ```
3. Please make sure Nodemon is installed globally on your laptop,
    If not
    ```
    npm install -g nodemon
    ```
4.  To start the server,
    ```
    $ npm start 
    ```
    Note: 
    - Port for backend is `4000`, go to `localhost:4000` on the Browser

## Setting Up Frontend
1.  Go to `rss_frontend` folder as,

    ```
    cd rss_frontend
    ```
2. Install the packages as,
    ```
    $ yarn install
    ```
3.  To run the frontend,
    ```
    $ yarn run serve 
    ```
4.  To build,
    ```
    $ yarn run build 
    ```
    Note: 
    - Before setting up frontend, you should have [Vue](https://vuejs.org/v2/guide/installation.html) installed.
    - Default Port for frontend is `8080`, go to `localhost:8080` on the Browser
    - Default Login 
        - **username**: *Admin*
        - **password**: *admin*




