/**
 * 房价涨幅图表专用脚本
 * 用于创建和渲染2025年乌鲁木齐各区域房价预计涨幅图表
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化房价涨幅图表
    initPriceIncreaseChart();
    
    // 监听窗口大小变化，重新渲染图表
    window.addEventListener('resize', debounce(function() {
        initPriceIncreaseChart();
    }, 250));
});

/**
 * 防抖函数，避免频繁触发事件
 */
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

/**
 * 初始化房价涨幅图表
 */
function initPriceIncreaseChart() {
    createPriceIncreaseChart();
}

/**
 * 创建房价涨幅图表
 */
function createPriceIncreaseChart() {
    // 检查容器是否存在
    const container = document.getElementById('price-increase-chart');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 房价涨幅数据
    const data = {
        labels: ['高新区', '经开区', '水磨沟区', '沙依巴克区', '米东区', '头屯河区'],
        datasets: [{
            label: '预计涨幅(%)',
            data: [6.8, 6.5, 5.0, 4.2, 3.8, 3.5],
            backgroundColor: [
                'rgba(30, 64, 175, 0.9)',  // 深蓝色主色调
                'rgba(30, 64, 175, 0.8)',
                'rgba(30, 64, 175, 0.7)',
                'rgba(30, 64, 175, 0.6)',
                'rgba(30, 64, 175, 0.5)',
                'rgba(30, 64, 175, 0.4)'
            ],
            borderColor: [
                'rgba(30, 64, 175, 1)',
                'rgba(30, 64, 175, 1)',
                'rgba(30, 64, 175, 1)',
                'rgba(30, 64, 175, 1)',
                'rgba(30, 64, 175, 1)',
                'rgba(30, 64, 175, 1)'
            ],
            borderWidth: 1,
            borderRadius: 4
        }]
    };
    
    // 创建画布元素
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    
    // 绘制图表
    new Chart(canvas, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#666',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    padding: 10,
                    boxPadding: 5,
                    callbacks: {
                        label: function(context) {
                            return '预计涨幅: ' + context.parsed.y.toFixed(1) + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 8,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1) + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// 将函数暴露到全局作用域，以便其他脚本可以调用
window.createPriceIncreaseChart = createPriceIncreaseChart;