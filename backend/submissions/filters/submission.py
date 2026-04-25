import django_filters

from submissions import models


class SubmissionFilterSet(django_filters.FilterSet):
    """Filter set for the submissions list endpoint.

    Implements status, broker, and company search filters.
    """

    # field_name="status": Matches submission.status field
    # lookup_expr="iexact" = case-insensitive exact match, e.g. ?status=new matches "new", "New", "NEW"
    status = django_filters.CharFilter(field_name="status", lookup_expr="iexact")

    # field_name="broker__id" filter: Matches submission.broker.id 
    # No lookup_expr = default exact match for numbers, e.g. brokerId=3 returns submissions where broker.id == 3
    brokerId = django_filters.NumberFilter(field_name="broker__id")

    # Company search filter: Matches submission.company.legal_name (traverses foreign key)
    # lookup_expr="icontains" = case-insensitive partial match e.g. ?companySearch=tech matches "TechCorp", "Biotech Inc", "technology"
    companySearch = django_filters.CharFilter(field_name="company__legal_name", lookup_expr="icontains")

    class Meta:
        # The Django model this FilterSet operates on
        model = models.Submission
        
        # List of filter parameters accepted in URL query strings
        # Example valid URL: /api/submissions/?status=new&brokerId=3&companySearch=tech
        fields = ["status", "brokerId", "companySearch"]

