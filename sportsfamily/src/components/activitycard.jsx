import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types'; // 用于类型检查
import {useNavigate} from 'react-router-dom';

const ActivityCard = ({
                          activity,
                          showButton = true,
                          cardStyle = 'default'
                      }) => {
    // 解构活动数据
    const {
        id,
        title,
        stadium,
        startTime,
        currentParticipants,
        maxParticipants,
        status
    } = activity;

    // 格式化日期和时间
    const formattedDate = dayjs(startTime).format('YYYY-MM-DD');
    const formattedTime = dayjs(startTime).format('HH:mm');

    // 计算进度百分比
    const progressPercent = Math.round(
        (currentParticipants / maxParticipants) * 100
    );

    const navigate = useNavigate();

    // 不同样式的卡片
    const cardStyles = {
        default: 'border-l-4 border-blue-500',
        compact: 'border-t-4 border-blue-500',
        featured: 'border-2 border-blue-500 shadow-lg'
    };

    return (
        <Link
            to={`/activity/${id}`}
            className={`block group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col ${cardStyles[cardStyle]}`}
        >
            <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {title}
                    </h2>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {stadium}
          </span>
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{formattedDate} {formattedTime}</span>
                </div>

                <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>招募进度</span>
                        <span>
              {currentParticipants}/{maxParticipants}人
            </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>
            </div>

            {showButton && (
                <div className="px-5 pb-4">
                    <button
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/activity/${id}`);
                        }}
                    >
                        {status === 'recruiting' ? '参加活动' : '查看详情'}
                    </button>
                </div>
            )}
        </Link>
    );
};

// 类型检查
ActivityCard.propTypes = {
    activity: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        stadium: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        currentParticipants: PropTypes.number.isRequired,
        maxParticipants: PropTypes.number.isRequired,
        status: PropTypes.oneOf(['recruiting', 'completed', 'cancelled'])
    }).isRequired,
    showButton: PropTypes.bool,
    cardStyle: PropTypes.oneOf(['default', 'compact', 'featured'])
};

ActivityCard.defaultProps = {
    showButton: true,
    cardStyle: 'default'
};

export default ActivityCard;
