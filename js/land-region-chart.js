/**
 * 土地市场区域分化图表脚本
 * 用于创建和渲染土地市场区域分化相关的图表
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化土地市场区域分化图表
    createNorthernIndustrialChart();
    createCentralServiceChart();
    createSouthernTourismChart();
});

/**
 * 创建北部实体产业集聚图表
 */
function createNorthernIndustrialChart() {
    // 检查容器是否存在
    const container = document.getElementById('northern-industrial-chart');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 北部实体产业集聚数据
    const data = {
        labels: ['甘泉堡经开区', '米东区'],
        datasets: [{
            label: '工业用地面积(亩)',
            data: [38788, 8285],
            backgroundColor: [
                'rgba(54, 162, 235, 0.7)',
                'rgba(75, 192, 192, 0.7)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)'
            ],
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
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toLocaleString() + ' 亩';
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
                            return value.toLocaleString() + ' 亩';
                        }
                    }
                }
            }
        }
    });
}

/**
 * 创建中部服务业升级图表
 */
function createCentralServiceChart() {
    // 检查容器是否存在
    const container = document.getElementById('central-service-chart');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 中部服务业升级数据
    const data = {
        labels: ['天山区/沙区住宅地块', '水磨沟区会展片区'],
        datasets: [{
            label: '溢价率(%)',
            data: [7.5, 5.2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(255, 159, 64, 0.7)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 159, 64, 1)'
            ],
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
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
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
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
}

/**
 * 创建南部文旅生态图表
 */
function createSouthernTourismChart() {
    // 检查容器是否存在
    const container = document.getElementById('southern-tourism-chart');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 南部文旅生态数据
    const data = {
        labels: ['文旅商业用地', '流拍率'],
        datasets: [{
            label: '面积(亩)/比率(%)',
            data: [1901, 30],
            backgroundColor: [
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 206, 86, 0.7)'
            ],
            borderColor: [
                'rgba(153, 102, 255, 1)',
                'rgba(255, 206, 86, 1)'
            ],
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
                    callbacks: {
                        label: function(context) {
                            const label = context.label;
                            if (label === '文旅商业用地') {
                                return '面积: ' + context.parsed.y.toLocaleString() + ' 亩';
                            } else {
                                return '流拍率: ' + context.parsed.y + '%';
                            }
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
                            return value;
                        }
                    }
                }
            }
        }
    });
}