/**
 * 土地市场分析图表脚本
 * 用于创建和渲染土地市场分析相关的图表
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化土地市场分析图表
    createLandSupplyChart();
    createLandUsageChart();
});

/**
 * 创建土地供应结构图表
 */
function createLandSupplyChart() {
    // 检查容器是否存在
    const container = document.getElementById('land-supply-chart');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 土地供应结构数据
    const data = {
        labels: ['产业用地', '城镇住宅用地', '商业用地'],
        datasets: [{
            label: '土地供应占比',
            data: [72.2, 19.4, 8.4],
            backgroundColor: [
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 99, 132, 0.7)',
                'rgba(255, 206, 86, 0.7)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
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
        type: 'pie',
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
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

/**
 * 创建土地用途分布图表
 */
function createLandUsageChart() {
    // 检查容器是否存在
    const container = document.getElementById('land-usage-chart');
    if (!container) return;
    
    // 清空容器
    container.innerHTML = '';
    
    // 土地用途数据
    const data = {
        labels: ['甘泉堡经开区', '天山区/沙依巴克区', '米东区/经开区', '乌鲁木齐县'],
        datasets: [{
            label: '产业用地(亩)',
            data: [38788, 0, 15053, 0],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }, {
            label: '住宅/商业用地(亩)',
            data: [0, 8070, 0, 1901],
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
            borderColor: 'rgba(255, 99, 132, 1)',
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