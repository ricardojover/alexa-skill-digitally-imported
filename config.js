// config file - alter this to reflect your setup

const classical_url = 'http://prem2.classicalradio.com:80/';
const di_url = 'http://prem2.di.fm:80/';
const classical = "Classical Radio";
const di = "Digitally Imported";

var protocols = {
    HTTP: "http",
    HTTPS: "https"
}

module.exports = {
    server: {
        internalIP: '<your-internal-ip>', // if you are not sure, just write '0.0.0.0'
        port: '<your-port>',	// e.g. 443 
        url: '<your-server-url>/di',
        protocol: protocols.HTTP // possible values protocols.HTTP or protocols.HTTPS
    },
	diFM : {
		listenKey 	: '<your-listen-key>', 
        channels: { // Example of favourite channels with all info you may need
            'Vivaldi': {
                title: 'Antonio Vivaldi - 1678 to 1741',
                site: classical,
                baseUrl: classical_url,
                suffix: '',
                imageUrl: "https://cdn-images.audioaddict.com/4/e/2/2/2/3/4e22231a55123934fa159fbbe7df7985.png?size=200x200"
            },
            'baroque': {
                title: 'Baroque Music - Western art music composed from approximately 1600 to 1750',
                site: classical,
                baseUrl: classical_url,
                suffix: '',
                imageUrl: "https://cdn-images.audioaddict.com/0/4/3/a/a/2/043aa2e9049d6a7ebec5d7c0d2656a89.png?size=200x200"
            },
            'nightcore': {
                title: "NightCore Music",
                site: di,
                baseUrl: di_url,
                suffix: '_hi',
                imageUrl: "https://cdn-images.audioaddict.com/2/5/a/6/0/6/25a606274630f89ce330c455f34b3118.jpg?size=200x200"
            },
            'hardstyle': {
                title: "HardStyle Music",
                site: di,
                baseUrl: di_url,
                suffix: '_hi',
                imageUrl: "https://cdn-images.audioaddict.com/6/b/e/1/8/9/6be189246347afc49d68971a006e9e6b.jpg?size=200x200"
            },
            'hardcore': {
                title: "HardCore Music",
                site: di,
                baseUrl: di_url,
                suffix: '_hi',
                imageUrl: "https://cdn-images.audioaddict.com/7/7/0/1/2/5/77012545b863ce96bd1e44c2c85fdb34.jpg?size=200x200"
            }
        }
	},
	alexa : {
        appID: '<your-skill-api>' // You will find it at https://developer.amazon.com/alexa/console/ask
	},
	certs : {
        privateKey: "<path-to-your-private-key>", // privkey.pem
        certificate: "<path-to-your-certificate>" // fullchain.pem
	}

}
