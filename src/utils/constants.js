exports.IS_DELETED = {
    200: 'No', // chưa xóa
    300: 'Yes', // đã xóa
};
exports.DEFAULT_PAGE = 1;
exports.DEFAULT_LIMIT = 10;
exports.ROLE = {
    100: 'ADMIN', 
    200: 'CUSTOMER',
}

exports.LEVEL_TEAM = {
    100: 'STRONG',
    200: 'MEDIUM',
    300: 'WEAK',
    400: 'VERY_WEAK',
}

exports.RENTAL_TIME = {
    100: '07:00:00 AM - 08:00:00:AM',
    200: '08:30:00 AM - 09:30:00:AM',
    300: '10:00:00 AM - 11:00:00:AM',
    400: '02:00:00 PM - 03:00:00:PM',
    500: '04:00:00 PM - 05:00:00:PM',
    600: '05:00:00 PM - 06:30:00:PM',
    700: '07:00:00 PM - 08:30:00:PM',
    800: '08:30:00 PM - 10:00:00:PM',
}

exports.POSITION_PLAYER = {
    101: 'GK',
    102: 'SW',
    103: 'LB',
    104: 'CB',
    105: 'RB',
    106: 'LWB',
    107: 'RWB',
    108: 'DM',
    109: 'CM',
    110: 'AM',
    111: 'LW',
    112: 'RW',
    113: 'S',
    114: 'CF',
}
exports.STATUS_BOOKING = {
    100: 'PENDING',
    200: 'FULFILLED'
}