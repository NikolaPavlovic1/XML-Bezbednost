package agent.agent.model;

import javax.xml.bind.annotation.XmlEnum;
import javax.xml.bind.annotation.XmlType;

@XmlEnum
@XmlType(name = "user_role")
public enum UserRole {

	ADMIN, USER, AGENT;
}