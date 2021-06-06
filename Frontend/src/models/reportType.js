export default class ReportType {
  constructor(reportType) {
    this.report_type_id = reportType.report_type_id;
    this.type_name = reportType.type_name;
    this.require_event = reportType.require_event;
    this.require_suspect = reportType.require_suspect;
    this.created_at = reportType.created_at;
    this.updated_at = reportType.updated_at;
  }
}
