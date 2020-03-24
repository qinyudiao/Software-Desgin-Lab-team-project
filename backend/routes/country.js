// Router to handle country stuff

var express = require('express');
var router = express.Router();
var request = require('request');


var isoCountries = {
    'ABW': 'Aruba',
    'AFG': 'Afghanistan',
    'AGO': 'Angola',
    'AIA': 'Anguilla',
    'ALA': 'Åland Islands',
    'ALB': 'Albania',
    'AND': 'Andorra',
    'ANT': 'Netherlands Antilles',
    'ARE': 'United Arab Emirates',
    'ARG': 'Argentina',
    'ARM': 'Armenia',
    'ASM': 'American Samoa',
    'ATA': 'Antarctica',
    'ATF': 'French Southern Territories',
    'ATG': 'Antigua and Barbuda',
    'AUS': 'Australia',
    'AUT': 'Austria',
    'AZE': 'Azerbaijan',
    'BDI': 'Burundi',
    'BEL': 'Belgium',
    'BEN': 'Benin',
    'BFA': 'Burkina Faso',
    'BGD': 'Bangladesh',
    'BGR': 'Bulgaria',
    'BHR': 'Bahrain',
    'BHS': 'Bahamas',
    'BIH': 'Bosnia and Herzegovina',
    'BLM': 'Saint Barthélemy',
    'BLR': 'Belarus',
    'BLZ': 'Belize',
    'BMU': 'Bermuda',
    'BOL': 'Bolivia',
    'BRA': 'Brazil',
    'BRB': 'Barbados',
    'BRN': 'Brunei Darussalam',
    'BTN': 'Bhutan',
    'BVT': 'Bouvet Island',
    'BWA': 'Botswana',
    'CAF': 'Central African Republic',
    'CAN': 'Canada',
    'CCK': 'Cocos Islands',
    'CHE': 'Switzerland',
    'CHL': 'Chile',
    'CHN': 'China',
    'CIV': "Côte d'Ivoire",
    'CMR': 'Cameroon',
    'COD': 'Congo, the Democratic Republic of the ',
    'COG': 'Congo',
    'COK': 'Cook Islands',
    'COL': 'Colombia',
    'COM': 'Comoros',
    'CPV': 'Cape Verde',
    'CRI': 'Costa Rica',
    'CUB': 'Cuba',
    'CXR': 'Christmas Island',
    'CYM': 'Cayman Islands',
    'CYP': 'Cyprus',
    'CZE': 'Czech Republic',
    'DEU': 'Germany',
    'DJI': 'Djibouti',
    'DMA': 'Dominica',
    'DNK': 'Denmark',
    'DOM': 'Dominican Republic',
    'DZA': 'Algeria',
    'ECU': 'Ecuador',
    'EGY': 'Egypt',
    'ERI': 'Eritrea',
    'ESH': 'Western Sahara',
    'ESP': 'Spain',
    'EST': 'Estonia',
    'ETH': 'Ethiopia',
    'FIN': 'Finland',
    'FJI': 'Fiji',
    'FLK': 'Falkland Islands ',
    'FRA': 'France',
    'FRO': 'Faroe Islands',
    'FSM': 'Micronesia',
    'GAB': 'Gabon',
    'GBR': 'United Kingdom',
    'GEO': 'Georgia',
    'GGY': 'Guernsey',
    'GHA': 'Ghana',
    'GIB': 'Gibraltar',
    'GIN': 'Guinea',
    'GLP': 'Guadeloupe',
    'GMB': 'Gambia',
    'GNB': 'Guinea-Bissau',
    'GNQ': 'Equatorial',
    'GRC': 'Greece',
    'GRD': 'Grenada',
    'GRL': 'Greenland',
    'GTM': 'Guatemala',
    'GUF': 'French',
    'GUM': 'Guam',
    'GUY': 'Guyana',
    'HKG': 'Hong Kong',
    'HMD': 'Heard Island and McDonald Islands',
    'HND': 'Honduras',
    'HRV': 'Croatia',
    'HTI': 'Haiti',
    'HUN': 'Hungary',
    'IDN': 'Indonesia',
    'IMN': 'Isle of Man',
    'IND': 'India',
    'IOT': 'British Indian Ocean Territory',
    'IRL': 'Ireland',
    'IRN': 'Iran',
    'IRQ': 'Iraq',
    'ISL': 'Iceland',
    'ISR': 'Israel',
    'ITA': 'Italy',
    'JAM': 'Jamaica',
    'JEY': 'Jersey',
    'JOR': 'Jordan',
    'JPN': 'Japan',
    'KAZ': 'Kazakhstan',
    'KEN': 'Kenya',
    'KGZ': 'Kyrgyzstan',
    'KHM': 'Cambodia',
    'KIR': 'Kiribati',
    'KNA': 'Saint',
    'KOR': 'Korea',
    'KWT': 'Kuwait',
    'LAO': 'Lao',
    'LBN': 'Lebanon',
    'LBR': 'Liberia',
    'LBY': 'Libya',
    'LCA': 'Saint Lucia',
    'LIE': 'Liechtenstein',
    'LKA': 'Sri Lanka',
    'LSO': 'Lesotho',
    'LTU': 'Lithuania',
    'LUX': 'Luxembourg',
    'LVA': 'Latvia',
    'MAC': 'Macao',
    'MAF': 'Saint Martin',
    'MAR': 'Morocco',
    'MCO': 'Monaco',
    'MDA': 'Moldova',
    'MDG': 'Madagascar',
    'MDV': 'Maldives',
    'MEX': 'Mexico',
    'MHL': 'Marshall Islands',
    'MKD': 'Macedonia',
    'MLI': 'Mali',
    'MLT': 'Malta',
    'MMR': 'Myanmar',
    'MNE': 'Montenegro',
    'MNG': 'Mongolia',
    'MNP': 'Northern Mariana Islands',
    'MOZ': 'Mozambique',
    'MRT': 'Mauritania',
    'MSR': 'Montserrat',
    'MTQ': 'Martinique',
    'MUS': 'Mauritius',
    'MWI': 'Malawi',
    'MYS': 'Malaysia',
    'MYT': 'Mayotte',
    'NAM': 'Namibia',
    'NCL': 'New Caledonia',
    'NER': 'Niger',
    'NFK': 'Norfolk Island',
    'NGA': 'Nigeria',
    'NIC': 'Nicaragua',
    'NIU': 'Niue',
    'NLD': 'Netherlands',
    'NOR': 'Norway',
    'NPL': 'Nepal',
    'NRU': 'Nauru',
    'NZL': 'New Zealand',
    'OMN': 'Oman',
    'PAK': 'Pakistan',
    'PAN': 'Panama',
    'PCN': 'Pitcairn',
    'PER': 'Peru',
    'PHL': 'Philippines',
    'PLW': 'Palau',
    'PNG': 'Papua New Guinea',
    'POL': 'Poland',
    'PRI': 'Puerto Rico',
    'PRK': 'Korea',
    'PRT': 'Portugal',
    'PRY': 'Paraguay',
    'PSE': 'Palestine',
    'PYF': 'French Polynesia',
    'QAT': 'Qatar',
    'REU': 'Réunion',
    'ROU': 'Romania',
    'RUS': 'Russian Federation',
    'RWA': 'Rwanda',
    'SAU': 'Saudi Arabia',
    'SDN': 'Sudan',
    'SEN': 'Senegal',
    'SGP': 'Singapore',
    'SGS': 'South Georgia and the South Sandwich Islands',
    'SHN': 'Saint Helena, Ascension and Tristan da Cunha',
    'SJM': 'Svalbard and Jan Mayen',
    'SLB': 'Solomon Islands',
    'SLE': 'Sierra Leone',
    'SLV': 'El Salvador',
    'SMR': 'San Marino',
    'SOM': 'Somalia',
    'SPM': 'Saint Pierre and Miquelon',
    'SRB': 'Serbia',
    'STP': 'Sao Tome and Principe',
    'SUR': 'Suriname',
    'SVK': 'Slovakia',
    'SVN': 'Slovenia',
    'SWE': 'Sweden',
    'SWZ': 'Swaziland',
    'SYC': 'Seychelles',
    'SYR': 'Syria',
    'TCA': 'Turks and Caicos',
    'TCD': 'Chad',
    'TGO': 'Togo',
    'THA': 'Thailand',
    'TJK': 'Tajikistan',
    'TKL': 'Tokelau',
    'TKM': 'Turkmenistan',
    'TLS': 'Timor-Leste',
    'TON': 'Tonga',
    'TTO': 'Trinidad and Tobago',
    'TUN': 'Tunisia',
    'TUR': 'Turkey',
    'TUV': 'Tuvalu',
    'TWN': 'Taiwan',
    'TZA': 'Tanzania',
    'UGA': 'Uganda',
    'UKR': 'Ukraine',
    'UMI': 'United States Minor Outlying Islands',
    'URY': 'Uruguay',
    'USA': 'United States',
    'UZB': 'Uzbekistan',
    'VAT': 'Vatican',
    'VCT': 'Saint Vincent and the Grenadines',
    'VEN': 'Venezuela, Bolivarian Republic of ',
    'VGB': 'Virgin Islands, British',
    'VIR': 'Virgin Islands, U.S.',
    'VNM': 'Vietname',
    'VUT': 'Vanuatu',
    'WLF': 'Wallis and Futuna',
    'WSM': 'Samoa',
    'YEM': 'Yemen',
    'ZAF': 'South Africa',
    'ZMB': 'Zambia',
    'ZWE': 'Zimbabwe',
    'ZAF':  'South Africa',
    'ZMB':  'Zambia,',
    'ZWE':  'Zimbabwe'
};

function getCountryName (countryCode) {
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
}

router.get('/', function (req, res){
    request('https://launchlibrary.net/1.4/agency', function(error, response, body){
        if(!error && response.statusCode == 200){
            let countryCode = JSON.parse(response.body);
            let countries = [];
            for(let i = 0; i < countryCode.agencies.length; i++){
                let temp = countryCode.agencies[i].countryCode;
                countries.push(getCountryName(temp));
            }
            res.send(countries);
        }
    });
});

module.exports = router;




