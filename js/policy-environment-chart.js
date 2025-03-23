/**
 * 政策环境图表脚本
 * 用于创建和渲染政策环境相关的图表
 */

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', initPolicyCharts);

// 监听图表重新加载事件
document.addEventListener('chartreload', initPolicyCharts);

// 初始化政策环境图表
function initPolicyCharts() {
    // 供给侧改革成效图表
    const supplyReformCtx = document.getElementById('supply-reform-chart');
    if (supplyReformCtx) {
        // 确保获取到的是Canvas元素或创建一个新的Canvas
        let canvas;
        if (supplyReformCtx.tagName === 'CANVAS') {
            canvas = supplyReformCtx;
        } else {
            // 清空容器
            supplyReformCtx.innerHTML = '';
            // 创建Canvas元素
            canvas = document.createElement('canvas');
            supplyReformCtx.appendChild(canvas);
        }
        
        // 使用Canvas创建图表
        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: ['2023', '2024', '2025'],
                datasets: [{
                    label: '土地审批效率提升(%)',
                    data: [15, 28, 42],
                    backgroundColor: 'rgba(37, 99, 235, 0.7)',
                    borderColor: 'rgba(37, 99, 235, 1)',
                    borderWidth: 1
                }, {
                    label: '土地超市交易量增长(%)',
                    data: [8, 22, 35],
                    backgroundColor: 'rgba(96, 165, 250, 0.7)',
                    borderColor: 'rgba(96, 165, 250, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151'
                        }
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151'
                        }
                    }
                }
            }
        });
    }

    // 需求侧政策效果图表
    const demandPolicyChart = document.getElementById('demand-policy-chart');
    if (demandPolicyChart) {
        // 确保获取到的是Canvas元素或创建一个新的Canvas
        let canvas;
        if (demandPolicyChart.tagName === 'CANVAS') {
            canvas = demandPolicyChart;
        } else {
            // 清空容器
            demandPolicyChart.innerHTML = '';
            // 创建Canvas元素
            canvas = document.createElement('canvas');
            demandPolicyChart.appendChild(canvas);
        }
        
        // 使用Canvas创建图表
        new Chart(canvas, {
            type: 'line',
            data: {
                labels: ['2023Q1', '2023Q2', '2023Q3', '2023Q4', '2024Q1', '2024Q2', '2024Q3', '2024Q4', '2025Q1', '2025Q2'],
                datasets: [{
                    label: '首套房贷款利率(%)',
                    data: [4.8, 4.6, 4.5, 4.3, 4.1, 3.9, 3.8, 3.7, 3.6, 3.5],
                    borderColor: 'rgba(37, 99, 235, 1)',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3
                }, {
                    label: '保障性住房覆盖率(%)',
                    data: [12, 13, 14, 15, 16, 17, 18, 19, 20, 22],
                    borderColor: 'rgba(96, 165, 250, 1)',
                    backgroundColor: 'rgba(96, 165, 250, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151'
                        }
                    },
                    title: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            color: document.documentElement.classList.contains('dark') ? '#e5e7eb' : '#374151'
                        }
                    }
                }
            }
        });
    }
}