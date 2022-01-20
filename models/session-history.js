class SessionHistory {
  constructor(admin_id, uid, sid, time_stamp, pid, shid, status) {
          this.admin_id = admin_id;
          this.uid = uid;
          this.sid = sid;
          this.time_stamp = time_stamp;
          this.pid = pid;
          this.shid = shid;
          this.status = status;
  }
}

module.exports = SessionHistory;
