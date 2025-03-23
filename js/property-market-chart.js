/**
 * 商品房市场运行特征图表脚本
 * 用于创建和渲染商品房市场运行特征相关的图表
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化商品房市场运行特征图表
    createPropertyMarketCharts();
});

/**
 * 初始化商品房市场运行特征图表
 */
function createPropertyMarketCharts() {
    // 创建住宅市场结构图表
    createResidentialMarketChart();
    
    // 创建非住宅市场图表
    createNonResidentialMarketChart();
    
    // 创建二手房市场图表
    createSecondHandMarketChart();
    
    // 监听窗口大小变化，重新渲染图表
    window.addEventListener('resize', debounce(function() {
        createResidentialMarketChart();
        createNonResidentialMarketChart();
        createSecondHandMarketChart();
    }, 250));
}

/**
 * 创建住宅市场结构图表
 */
function createResidentialMarketChart() {
    // 检查容器是否存在
    const container = document.getElementById('residential-market-chart');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 住宅市场数据
    const data = {
        labels: ['水磨沟区', '高新区', '天山区', '沙依巴克区', '米东区', '头屯河区'],
        datasets: [{
            label: '商品住宅成交面积(㎡)',
            data: [53528, 32468, 29850, 27640, 25420, 19870],
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1
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
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 6,
                        font: {
                            size: window.innerWidth < 768 ? 10 : 12
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#666',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    padding: window.innerWidth < 768 ? 6 : 10,
                    boxPadding: window.innerWidth < 768 ? 3 : 5,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toLocaleString() + ' ㎡';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString() + ' ㎡';
                        }
                    }
                }
            }
        }
    });
}

/**
 * 创建非住宅市场图表
 */
function createNonResidentialMarketChart() {
    // 检查容器是否存在
    const container = document.getElementById('non-residential-market-chart');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 非住宅市场数据
    const data = {
        labels: ['商业地产', '工业地产'],
        datasets: [{
            label: '2024年2月',
            data: [30400, 18200],
            backgroundColor: 'rgba(107, 114, 128, 0.7)',
            borderColor: 'rgb(107, 114, 128)',
            borderWidth: 1
        }, {
            label: '2025年2月',
            data: [26600, 21500],
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1
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
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 6,
                        font: {
                            size: window.innerWidth < 768 ? 10 : 12
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#666',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    padding: window.innerWidth < 768 ? 6 : 10,
                    boxPadding: window.innerWidth < 768 ? 3 : 5,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toLocaleString() + ' ㎡';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString() + ' ㎡';
                        }
                    }
                }
            }
        }
    });
}

/**
 * 创建二手房市场图表
 */
function createSecondHandMarketChart() {
    // 检查容器是否存在
    const container = document.getElementById('second-hand-market-chart');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 二手房市场数据
    const data = {
        labels: ['天山区', '水磨沟区', '沙依巴克区', '高新区', '米东区', '头屯河区'],
        datasets: [{
            label: '二手住宅成交量(套)',
            data: [1246, 985, 872, 764, 582, 370],
            backgroundColor: 'rgba(59, 130, 246, 0.7)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1
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
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 6,
                        font: {
                            size: window.innerWidth < 768 ? 10 : 12
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#333',
                    bodyColor: '#666',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    padding: window.innerWidth < 768 ? 6 : 10,
                    boxPadding: window.innerWidth < 768 ? 3 : 5,
                    usePointStyle: true,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toLocaleString() + ' 套';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString() + ' 套';
                        }
                    }
                }
            }
        }
    });
}