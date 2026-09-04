package com.jobtrack.dto;

public class ApplicationStatsResponse {

    private long total;
    private long applied;
    private long interviews;
    private long rejected;
    private long selected;

    public ApplicationStatsResponse() {
    }

    public ApplicationStatsResponse(long total, long applied, long interviews, long rejected, long selected) {
        this.total = total;
        this.applied = applied;
        this.interviews = interviews;
        this.rejected = rejected;
        this.selected = selected;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public long getApplied() {
        return applied;
    }

    public void setApplied(long applied) {
        this.applied = applied;
    }

    public long getInterviews() {
        return interviews;
    }

    public void setInterviews(long interviews) {
        this.interviews = interviews;
    }

    public long getRejected() {
        return rejected;
    }

    public void setRejected(long rejected) {
        this.rejected = rejected;
    }

    public long getSelected() {
        return selected;
    }

    public void setSelected(long selected) {
        this.selected = selected;
    }
}
