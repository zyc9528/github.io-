/**
 * 房地产市场数据可视化脚本
 * 用于创建和渲染报告中的图表和数据可视化
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有图表
    initCharts();
});

/**
 * 初始化所有图表
 */
function initCharts() {
    // 创建价格趋势图表
    createPriceTrendChart();
    
    // 创建区域对比图表
    createRegionComparisonChart();
    
    // 创建投资回报率图表
    createROIChart();
    
    // 监听窗口大小变化，重新渲染图表
    window.addEventListener('resize', debounce(function() {
        // 重新初始化所有图表
        createPriceTrendChart();
        createRegionComparisonChart();
        createROIChart();
        
        // 如果存在房价涨幅图表，也重新渲染
        if (document.getElementById('price-increase-chart') && window.createPriceIncreaseChart) {
            window.createPriceIncreaseChart();
        }
    }, 250));
}

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
 * 创建价格趋势图表
 */
function createPriceTrendChart() {
    // 检查容器是否存在
    const container = document.getElementById('price-trend-chart');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 价格趋势数据
    const data = {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025(预测)'],
        datasets: [
            {
                label: '住宅均价(元/㎡)',
                data: [9800, 10200, 10600, 11100, 11500, 12100],
                borderColor: 'rgb(14, 165, 233)',
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }
        ]
    };
    
    // 创建画布元素
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    
    // 绘制图表
    new Chart(canvas, {
        type: 'line',
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
                    titleFont: {
                        size: window.innerWidth < 768 ? 12 : 14
                    },
                    bodyFont: {
                        size: window.innerWidth < 768 ? 11 : 13
                    },
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toLocaleString() + ' 元/㎡';
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
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString() + ' 元';
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            // 移动设备上的触控优化
            events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
            // 触控设备上的点击半径更大，更容易选中数据点
            hitRadius: window.innerWidth < 768 ? 8 : 5,
            hoverRadius: window.innerWidth < 768 ? 6 : 4,
            elements: {
                point: {
                    radius: 3,
                    hoverRadius: 5
                }
            }
        }
    });
}

/**
 * 创建区域对比图表
 */
function createRegionComparisonChart() {
    // 检查容器是否存在
    const container = document.getElementById('region-comparison-chart');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 区域对比数据
    const data = {
        labels: ['高新区', '经开区', '水磨沟区', '沙依巴克区', '米东区', '头屯河区'],
        datasets: [
            {
                label: '2025年预计房价(元/㎡)',
                data: [14200, 13800, 12500, 11800, 10500, 10200],
                backgroundColor: [
                    'rgba(14, 165, 233, 0.8)',
                    'rgba(14, 165, 233, 0.7)',
                    'rgba(14, 165, 233, 0.6)',
                    'rgba(14, 165, 233, 0.5)',
                    'rgba(14, 165, 233, 0.4)',
                    'rgba(14, 165, 233, 0.3)'
                ],
                borderColor: [
                    'rgb(14, 165, 233)',
                    'rgb(14, 165, 233)',
                    'rgb(14, 165, 233)',
                    'rgb(14, 165, 233)',
                    'rgb(14, 165, 233)',
                    'rgb(14, 165, 233)'
                ],
                borderWidth: 1
            },
            {
                label: '预计涨幅(%)',
                data: [6.8, 6.5, 5.0, 4.2, 3.8, 3.5],
                backgroundColor: [
                    'rgba(249, 115, 22, 0.8)',
                    'rgba(249, 115, 22, 0.7)',
                    'rgba(249, 115, 22, 0.6)',
                    'rgba(249, 115, 22, 0.5)',
                    'rgba(249, 115, 22, 0.4)',
                    'rgba(249, 115, 22, 0.3)'
                ],
                borderColor: [
                    'rgb(249, 115, 22)',
                    'rgb(249, 115, 22)',
                    'rgb(249, 115, 22)',
                    'rgb(249, 115, 22)',
                    'rgb(249, 115, 22)',
                    'rgb(249, 115, 22)'
                ],
                borderWidth: 1,
                yAxisID: 'y1'
            }
        ]
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
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 6
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
                    padding: 10,
                    boxPadding: 5,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.datasetIndex === 0) {
                                label += context.parsed.y.toLocaleString() + ' 元/㎡';
                            } else {
                                label += context.parsed.y.toFixed(1) + '%';
                            }
                            return label;
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
                    beginAtZero: false,
                    position: 'left',
                    title: {
                        display: true,
                        text: '房价(元/㎡)'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                y1: {
                    beginAtZero: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: '涨幅(%)'
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });
}

/**
 * 创建投资回报率图表
 */
function createROIChart() {
    // 检查容器是否存在
    const container = document.getElementById('roi-chart');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 投资回报率数据
    const data = {
        labels: ['高新区', '经开区', '水磨沟区', '沙依巴克区', '米东区', '头屯河区'],
        datasets: [{
            label: '预期投资回报率(%)',
            data: [4.5, 4.2, 3.8, 3.5, 3.3, 3.2],
            backgroundColor: 'rgba(14, 165, 233, 0.6)',
            borderColor: 'rgb(14, 165, 233)',
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
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 6
                    }
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
                            return context.dataset.label + ': ' + context.parsed.x.toFixed(1) + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    grid: {
                        display: false
                    }
                },
                x: {
                    beginAtZero: true,
                    max: 5,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });
}