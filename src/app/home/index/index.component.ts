import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { WeatherHomePage } from 'src/app/models/weatherhomepage.model';
import { LocationAddress } from 'src/app/models/location.model';
import { WeatherHeader } from 'src/app/models/weather_header.model';
import { interval } from 'rxjs';
import { ResponseCorona } from 'src/app/models/reponse_corona.model';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  time: '';
  empData = [{
    userId: 1,
    'title': 'bcd',
    'body': 'asgasg'
  }, {
    userId: 2,
    'title': 'bcd',
    'body': 'asgasg'
  }, {
    userId: 3,
    'title': 'bcd',
    'body': 'asgasg'
  }]
  array = ["1", 2, "5", "4"];
  weathers: WeatherHomePage[] = [{
    id: 0,
    name: '',
    country: '',
    region: '',
    tempure: 0,
    weathercondition: '',
    date: '',
  }];
  world = true;
  weatherHeader: WeatherHeader[] = [{
    id: 0,
    name: '',
    country: '',
    region: '',
    temp: 0,
    weatherCondition: '',
  }];
  locationAddress: LocationAddress;
  responseCorona: ResponseCorona;
  constructor(private homeSerivce: HomeService) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.getWeathers();
      this.getLocation();
      this.loadReport();
      this.updateReport();
    }, 500);

    // var sorted = this.empData.sort((a, b) =>
    //   (a.userId > b.userId) ? -1 : 1 
    // ); //DESC
    // var sorted = this.empData.sort((a, b) =>
    // (a.userId > b.userId) ? 1 : -1 
    // ); //ASC
    // var filted = this.empData.filter((element)=>{
    //   return element.userId >= 2
    // });
  }

  sortItem(arr, type) {
    if (type === "City") {
      arr.sort((arrA: any, arrB: any) => {
        if (arrA.userId > arrB.userId) return 1;
        if (arrA.userId < arrB.userId) return 0;
        return 0;
      });
    }
  }
  onHandleChange() {
    console.log(this.time);
  }
  getWeathers() {
    this.homeSerivce.getAllWeatherToday().toPromise().then(res => {
      console.log(this.weathers = res);
    });
  }
  timeZone(name: string, region) {
    if (name.split(" ").length != 0) {
      name = name.split(" ").join("_");
      var timezone = new Date().toLocaleString("en-US", { timeZone: region + "/" + name });
      var date = new Date(timezone);
      var getTime = this.dayOfweek(date.getDay() + 1) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      return getTime;
    }
    var timezone = new Date().toLocaleString("en-US", { timeZone: region + "/" + name });
    var date = new Date(timezone);
    var getTime = this.dayOfweek(date.getDay() + 1) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return getTime;
  }
  dayOfweek(date: number) {
    if (date === 1) {
      return "Sunday"
    }
    if (date === 2) {
      return "Monday"
    }
    if (date === 3) {
      return "Tuesday"
    }
    if (date === 4) {
      return "Wednesday"
    }
    if (date === 5) {
      return "Thursday"
    }
    if (date === 6) {
      return "Friday"
    }
    if (date === 7) {
      return "Saturday"
    }
  }

  getIp() {
    this.homeSerivce.getIpAddress().subscribe(res => {
      console.log(res);
      //console.log(this.getLocation(res));
    })
  }
  getLocation() {
    this.homeSerivce.getLocationByIpAddress().subscribe(res => {
      console.log(this.locationAddress = res);
      console.log(this.getWeatherHeader(this.locationAddress));
    })
  }
  getWeatherHeader(locationAddress: LocationAddress) {
    var location = locationAddress.timezone.split("/")[1];
    var country = locationAddress.country;
    console.log(country);
    this.homeSerivce.getWeatherHeader(location).subscribe(res => {
      console.log(this.weatherHeader = res);
      console.log(this.getCoronaVirus(this.getCountryName(country)));
    });

  }
  getCoronaVirus(location: string) {
    this.homeSerivce.getCoronaSituation(location).subscribe(res => {
      console.log(this.responseCorona = res);
    });
  }
  flagImage(country: string) {
    switch (country) {
      case "Vietnam": return "vn.png";
      case "Thailand": return "th.png";
      case "China": return "cn.png";
      case "Japan": return "jp.png";
      case "Laos": return "la.png";
      case "Cambodia": return "kh.png";
      case "Singapore": return "sg.png";
      case "Korea": return "kr.png";
      case "Malaysia": return "my.png";
      default: return "";
    }
  }

  formatNumber(number)
  {
    return (new Intl.NumberFormat('en-US').format(number));
  }

  weatherConditionSwitch(weatherCondition: string) {
    switch (weatherCondition) {
      case "Sun shine": return "wt-1.png";
      case "Fog": return "wt-9.png";
      case "Rain": return "wt-18.png";
      case "Night": return "wt-13.png";
      case "Cloud": return "wt-7.png";
      case "Dry": return "dry.png";
      default: return "";
    }
  }

  loadReport() {

    interval(15000)
      .subscribe(() => {
        this.world = !this.world;
        console.log(this.world);
      });
  }

  updateReport()
  {
    interval(360000)
    .subscribe(() => {
      console.log(this.locationAddress.country);
      this.getCoronaVirus(this.getCountryName(this.locationAddress.country));
    });
  }

  isoCountries = {
    'AF': 'Afghanistan',
    'AX': 'Aland Islands',
    'AL': 'Albania',
    'DZ': 'Algeria',
    'AS': 'American Samoa',
    'AD': 'Andorra',
    'AO': 'Angola',
    'AI': 'Anguilla',
    'AQ': 'Antarctica',
    'AG': 'Antigua And Barbuda',
    'AR': 'Argentina',
    'AM': 'Armenia',
    'AW': 'Aruba',
    'AU': 'Australia',
    'AT': 'Austria',
    'AZ': 'Azerbaijan',
    'BS': 'Bahamas',
    'BH': 'Bahrain',
    'BD': 'Bangladesh',
    'BB': 'Barbados',
    'BY': 'Belarus',
    'BE': 'Belgium',
    'BZ': 'Belize',
    'BJ': 'Benin',
    'BM': 'Bermuda',
    'BT': 'Bhutan',
    'BO': 'Bolivia',
    'BA': 'Bosnia And Herzegovina',
    'BW': 'Botswana',
    'BV': 'Bouvet Island',
    'BR': 'Brazil',
    'IO': 'British Indian Ocean Territory',
    'BN': 'Brunei Darussalam',
    'BG': 'Bulgaria',
    'BF': 'Burkina Faso',
    'BI': 'Burundi',
    'KH': 'Cambodia',
    'CM': 'Cameroon',
    'CA': 'Canada',
    'CV': 'Cape Verde',
    'KY': 'Cayman Islands',
    'CF': 'Central African Republic',
    'TD': 'Chad',
    'CL': 'Chile',
    'CN': 'China',
    'CX': 'Christmas Island',
    'CC': 'Cocos (Keeling) Islands',
    'CO': 'Colombia',
    'KM': 'Comoros',
    'CG': 'Congo',
    'CD': 'Congo, Democratic Republic',
    'CK': 'Cook Islands',
    'CR': 'Costa Rica',
    'CI': 'Cote D\'Ivoire',
    'HR': 'Croatia',
    'CU': 'Cuba',
    'CY': 'Cyprus',
    'CZ': 'Czech Republic',
    'DK': 'Denmark',
    'DJ': 'Djibouti',
    'DM': 'Dominica',
    'DO': 'Dominican Republic',
    'EC': 'Ecuador',
    'EG': 'Egypt',
    'SV': 'El Salvador',
    'GQ': 'Equatorial Guinea',
    'ER': 'Eritrea',
    'EE': 'Estonia',
    'ET': 'Ethiopia',
    'FK': 'Falkland Islands (Malvinas)',
    'FO': 'Faroe Islands',
    'FJ': 'Fiji',
    'FI': 'Finland',
    'FR': 'France',
    'GF': 'French Guiana',
    'PF': 'French Polynesia',
    'TF': 'French Southern Territories',
    'GA': 'Gabon',
    'GM': 'Gambia',
    'GE': 'Georgia',
    'DE': 'Germany',
    'GH': 'Ghana',
    'GI': 'Gibraltar',
    'GR': 'Greece',
    'GL': 'Greenland',
    'GD': 'Grenada',
    'GP': 'Guadeloupe',
    'GU': 'Guam',
    'GT': 'Guatemala',
    'GG': 'Guernsey',
    'GN': 'Guinea',
    'GW': 'Guinea-Bissau',
    'GY': 'Guyana',
    'HT': 'Haiti',
    'HM': 'Heard Island & Mcdonald Islands',
    'VA': 'Holy See (Vatican City State)',
    'HN': 'Honduras',
    'HK': 'Hong Kong',
    'HU': 'Hungary',
    'IS': 'Iceland',
    'IN': 'India',
    'ID': 'Indonesia',
    'IR': 'Iran, Islamic Republic Of',
    'IQ': 'Iraq',
    'IE': 'Ireland',
    'IM': 'Isle Of Man',
    'IL': 'Israel',
    'IT': 'Italy',
    'JM': 'Jamaica',
    'JP': 'Japan',
    'JE': 'Jersey',
    'JO': 'Jordan',
    'KZ': 'Kazakhstan',
    'KE': 'Kenya',
    'KI': 'Kiribati',
    'KR': 'Korea',
    'KW': 'Kuwait',
    'KG': 'Kyrgyzstan',
    'LA': 'Lao People\'s Democratic Republic',
    'LV': 'Latvia',
    'LB': 'Lebanon',
    'LS': 'Lesotho',
    'LR': 'Liberia',
    'LY': 'Libyan Arab Jamahiriya',
    'LI': 'Liechtenstein',
    'LT': 'Lithuania',
    'LU': 'Luxembourg',
    'MO': 'Macao',
    'MK': 'Macedonia',
    'MG': 'Madagascar',
    'MW': 'Malawi',
    'MY': 'Malaysia',
    'MV': 'Maldives',
    'ML': 'Mali',
    'MT': 'Malta',
    'MH': 'Marshall Islands',
    'MQ': 'Martinique',
    'MR': 'Mauritania',
    'MU': 'Mauritius',
    'YT': 'Mayotte',
    'MX': 'Mexico',
    'FM': 'Micronesia, Federated States Of',
    'MD': 'Moldova',
    'MC': 'Monaco',
    'MN': 'Mongolia',
    'ME': 'Montenegro',
    'MS': 'Montserrat',
    'MA': 'Morocco',
    'MZ': 'Mozambique',
    'MM': 'Myanmar',
    'NA': 'Namibia',
    'NR': 'Nauru',
    'NP': 'Nepal',
    'NL': 'Netherlands',
    'AN': 'Netherlands Antilles',
    'NC': 'New Caledonia',
    'NZ': 'New Zealand',
    'NI': 'Nicaragua',
    'NE': 'Niger',
    'NG': 'Nigeria',
    'NU': 'Niue',
    'NF': 'Norfolk Island',
    'MP': 'Northern Mariana Islands',
    'NO': 'Norway',
    'OM': 'Oman',
    'PK': 'Pakistan',
    'PW': 'Palau',
    'PS': 'Palestinian Territory, Occupied',
    'PA': 'Panama',
    'PG': 'Papua New Guinea',
    'PY': 'Paraguay',
    'PE': 'Peru',
    'PH': 'Philippines',
    'PN': 'Pitcairn',
    'PL': 'Poland',
    'PT': 'Portugal',
    'PR': 'Puerto Rico',
    'QA': 'Qatar',
    'RE': 'Reunion',
    'RO': 'Romania',
    'RU': 'Russian Federation',
    'RW': 'Rwanda',
    'BL': 'Saint Barthelemy',
    'SH': 'Saint Helena',
    'KN': 'Saint Kitts And Nevis',
    'LC': 'Saint Lucia',
    'MF': 'Saint Martin',
    'PM': 'Saint Pierre And Miquelon',
    'VC': 'Saint Vincent And Grenadines',
    'WS': 'Samoa',
    'SM': 'San Marino',
    'ST': 'Sao Tome And Principe',
    'SA': 'Saudi Arabia',
    'SN': 'Senegal',
    'RS': 'Serbia',
    'SC': 'Seychelles',
    'SL': 'Sierra Leone',
    'SG': 'Singapore',
    'SK': 'Slovakia',
    'SI': 'Slovenia',
    'SB': 'Solomon Islands',
    'SO': 'Somalia',
    'ZA': 'South Africa',
    'GS': 'South Georgia And Sandwich Isl.',
    'ES': 'Spain',
    'LK': 'Sri Lanka',
    'SD': 'Sudan',
    'SR': 'Suriname',
    'SJ': 'Svalbard And Jan Mayen',
    'SZ': 'Swaziland',
    'SE': 'Sweden',
    'CH': 'Switzerland',
    'SY': 'Syrian Arab Republic',
    'TW': 'Taiwan',
    'TJ': 'Tajikistan',
    'TZ': 'Tanzania',
    'TH': 'Thailand',
    'TL': 'Timor-Leste',
    'TG': 'Togo',
    'TK': 'Tokelau',
    'TO': 'Tonga',
    'TT': 'Trinidad And Tobago',
    'TN': 'Tunisia',
    'TR': 'Turkey',
    'TM': 'Turkmenistan',
    'TC': 'Turks And Caicos Islands',
    'TV': 'Tuvalu',
    'UG': 'Uganda',
    'UA': 'Ukraine',
    'AE': 'United Arab Emirates',
    'GB': 'United Kingdom',
    'US': 'United States',
    'UM': 'United States Outlying Islands',
    'UY': 'Uruguay',
    'UZ': 'Uzbekistan',
    'VU': 'Vanuatu',
    'VE': 'Venezuela',
    'VN': 'Viet Nam',
    'VG': 'Virgin Islands, British',
    'VI': 'Virgin Islands, U.S.',
    'WF': 'Wallis And Futuna',
    'EH': 'Western Sahara',
    'YE': 'Yemen',
    'ZM': 'Zambia',
    'ZW': 'Zimbabwe'
  };

  getCountryName(countryCode) {
    if (this.isoCountries.hasOwnProperty(countryCode)) {
      return this.isoCountries[countryCode];
    } else {
      return countryCode;
    }
  }

}
