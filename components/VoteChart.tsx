'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { PollOption } from '@/lib/data';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function VoteVisualization({ options }: { options: PollOption[] }) {
    const data = options.map(opt => ({
        name: opt.label,
        value: opt.votes
    }));

    const total = options.reduce((acc, curr) => acc + curr.votes, 0);

    if (total === 0) {
        return (
            <div className="h-64 flex items-center justify-center text-slate-400 bg-slate-50 rounded-xl">
                まだ投票がありません
            </div>
        );
    }

    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: any) => [`${value} 票`, '投票数']}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
